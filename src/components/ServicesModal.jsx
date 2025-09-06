import React, { useEffect, useMemo, useState } from "react";
import {
  useFirebase,
  serverTimestamp,
  Timestamp,
  anonSignIn,
  auth,
} from "../firebase/FirebaseContext";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  runTransaction,
} from "firebase/firestore";

const ServicesModal = ({ isOpen, onClose, initialService, initialSubService }) => {
  const { db, user } = useFirebase();

  const [service, setService] = useState(initialService || "makeup");
  const [subService, setSubService] = useState(initialSubService || "day");
  const [date, setDate] = useState("");    
  const [slotId, setSlotId] = useState("");  
  const [freeSlots, setFreeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const PRICES = {
    makeup: { day: 1500, evening: 2900, bridal: 4800 },
    haircut: 3500,
    manicure: 1900,
    pedicure: 3200,
  };

  const selectedPrice = useMemo(() => (
    service === "makeup" ? PRICES.makeup[subService] : (PRICES[service] ?? 0)
  ), [service, subService]);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Обновляем состояние при изменении пропсов
  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialSubService) setSubService(initialSubService);
  }, [initialService, initialSubService]);

  useEffect(() => {
    if (!db || !isOpen) return;
    const now = Timestamp.fromDate(new Date());
    const qFree = query(
      collection(db, "slots"),
      where("status", "==", "free"),
      where("start", ">=", now),
      orderBy("start", "asc")
    );
    setLoading(true);
    const unsub = onSnapshot(
      qFree,
      (snap) => {
        setFreeSlots(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
        setMsg(
          err.code === "failed-precondition"
            ? "Нужен индекс (status asc, start asc)."
            : "Ошибка загрузки слотов: " + err.message
        );
      }
    );
    return () => unsub();
  }, [db, isOpen]);

  const fmt = (t) =>
    t?.toDate?.()?.toLocaleString?.("ru-RU", { dateStyle: "short", timeStyle: "short" });

  const daySlots = useMemo(() => {
    if (!date) return [];
    const s = new Date(date + "T00:00:00");
    const e = new Date(date + "T23:59:59.999");
    return freeSlots.filter((x) => {
      const d = x.start?.toDate?.();
      return d && d >= s && d <= e;
    });
  }, [date, freeSlots]);

  const ensureSignedIn = async () => {
    if (auth.currentUser) return auth.currentUser;
    await anonSignIn();
    return auth.currentUser;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!date) return setMsg("Укажите дату.");
    if (!slotId) return setMsg("Выберите время.");

    try {
      await ensureSignedIn();
      const uid = auth.currentUser?.uid;
      if (!uid) return setMsg("Не удалось получить UID. Повторите.");

      const chosen = daySlots.find((s) => s.id === slotId);
      if (!chosen) return setMsg("Выбранный слот уже недоступен.");

      const slotRef = doc(db, "slots", slotId);
      await runTransaction(db, async (tx) => {
        const snap = await tx.get(slotRef);
        if (!snap.exists()) throw new Error("Слот не найден.");
        const data = snap.data();
        const now = Timestamp.fromDate(new Date());

        if (data.status !== "free") throw new Error("Слот уже занят.");
        if (data.start.toMillis() < now.toMillis()) throw new Error("Слот в прошлом.");

        tx.update(slotRef, {
          status: "booked",
          userUid: uid,
          user: { name: user?.displayName || user?.email || "Клиент" },
          service,
          subService: service === "makeup" ? subService : null,
          price: selectedPrice,
          bookedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });

      setMsg("Запись успешно создана!");
      setTimeout(() => {
        setMsg("");
        setSlotId("");
        onClose?.();
      }, 1200);
    } catch (err) {
      console.error(err);
      setMsg(
        err.code === "permission-denied"
          ? "Недостаточно прав (проверь правила Firestore / App Check)."
          : "Ошибка: " + err.message
      );
    }
  };

  const onBackdropClick = (e) => {
    console.log('ServicesModal backdrop clicked', e.target, e.currentTarget);
    if (e.target === e.currentTarget) {
      console.log('Closing ServicesModal');
      onClose?.();
    }
  };

  // Обработчик клика на document для закрытия модалки
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && e.target.classList.contains('auth-modal')) {
        console.log('Document click - closing ServicesModal');
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="auth-modal" onClick={onBackdropClick} role="dialog" aria-label="Запись на прием">
      <div className="auth-modal-content" onClick={(ev) => ev.stopPropagation()}>
        <span className="close-button" onClick={onClose} aria-label="Закрыть">×</span>

        <section className="auth-section">
          <h1>Запись на прием и услуги</h1>

          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: 20,
              borderRadius: 8,
              color: "white",
            }}
          >
            <form onSubmit={handleBookingSubmit} style={{ marginTop: 20, textAlign: "left", display: "grid", gap: 16 }}>
              <div className="form-group">
                <label htmlFor="service-select">Выберите услугу:</label>
                <select
                  id="service-select"
                  value={service}
                  onChange={(e) => {
                    const v = e.target.value;
                    setService(v);
                    if (v !== "makeup") setSubService("day");
                  }}
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 5,
                    border: "1px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#111",
                  }}
                >
                  <option value="makeup">Макияж</option>
                  <option value="haircut">Стрижка волос</option>
                  <option value="manicure">Маникюр</option>
                  <option value="pedicure">Педикюр</option>
                </select>
              </div>

              {service === "makeup" && (
                <div className="form-group">
                  <label htmlFor="makeup-sub">Вид макияжа:</label>
                  <select
                    id="makeup-sub"
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                    style={{
                      width: "100%",
                      padding: 10,
                      borderRadius: 5,
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "#111",
                    }}
                  >
                    <option value="day">Дневной — 1 500 ₽</option>
                    <option value="evening">Вечерний — 2 900 ₽</option>
                    <option value="bridal">Свадебный — 4 800 ₽</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="date-select">Выберите дату:</label>
                <input
                  type="date"
                  id="date-select"
                  value={date}
                  min={minDate}
                  onChange={(e) => { setDate(e.target.value); setSlotId(""); }}
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 5,
                    border: "1px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#111",
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="time-select">Время:</label>
                <select
                  id="time-select"
                  value={slotId}
                  disabled={loading || !date}
                  onChange={(e) => setSlotId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 5,
                    border: "1px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#111",
                  }}
                >
                  <option value="">{loading ? "Загрузка…" : "Выберите время…"}</option>
                  {daySlots.map((s) => (
                    <option key={s.id} value={s.id}>
                      {fmt(s.start)}
                    </option>
                  ))}
                  {!loading && date && daySlots.length === 0 && (
                    <option disabled>Свободных слотов на этот день нет</option>
                  )}
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: 8, width: "auto", alignSelf: "center" }}>
                Записаться
              </button>
            </form>

            {msg && (
              <p style={{ marginTop: 15, color: msg.includes("Ошибка") || msg.includes("прав") ? "red" : "lightgreen" }}>
                {msg}
              </p>
            )}

            <div
              aria-live="polite"
              style={{
                marginTop: 16,
                padding: "12px 14px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <strong>Стоимость:&nbsp;</strong>
                <span style={{ fontWeight: 700 }}>
                  {Number.isFinite(selectedPrice) ? selectedPrice : "—"} ₽
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesModal;