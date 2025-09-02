import React, { useEffect, useMemo, useState } from "react";
import { useFirebase } from "../firebase/FirebaseContext";

const ProfileModal = ({ isOpen, onClose }) => {
  const { auth, db, user } = useFirebase();

  const [userBookings, setUserBookings] = useState([]);
  const [noBookingsMessage, setNoBookingsMessage] = useState(false);
  const [profilePicture, setProfilePicture] = useState("img/Rectangle.png");
  const [loading, setLoading] = useState(true);

  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [saving, setSaving] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const run = async () => {
      if (!isOpen || !user) return;
      setLoading(true);

      try {
        const userDoc = await db.collection("users").doc(user.uid).get();
        if (userDoc.exists && userDoc.data().profilePicture) {
          setProfilePicture(userDoc.data().profilePicture);
        } else {
          setProfilePicture("img/Rectangle.png");
        }
      } catch {
        setProfilePicture("img/Rectangle.png");
      }

      try {
        const snap = await db
          .collection("bookings")
          .where("userId", "==", user.uid)
          .orderBy("date", "asc")
          .get();

        if (snap.empty) {
          setUserBookings([]);
          setNoBookingsMessage(true);
        } else {
          const arr = [];
          snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
          setUserBookings(arr);
          setNoBookingsMessage(false);
        }
      } catch (e) {
        console.error("Ошибка при получении записей:", e);
        setUserBookings([{ id: "error", service: `Ошибка: ${e.message}`, date: "" }]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [isOpen, user, db]);

  const handleLogout = async () => {
    await auth.signOut();
    onClose();
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Вы уверены, что хотите отменить эту запись?")) return;
    try {
      await db.collection("bookings").doc(bookingId).delete();
      setUserBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Ошибка при отмене записи:", error);
      alert("Ошибка при отмене записи: " + error.message);
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!user) return alert("Пожалуйста, войдите, чтобы загрузить фото профиля.");
    if (!file) return;
    if (file.size > 1024 * 1024) return alert("Файл слишком большой! Максимум — 1 МБ.");

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const base64String = event.target.result;
        await db.collection("users").doc(user.uid).set(
          { profilePicture: base64String },
          { merge: true }
        );
        setProfilePicture(base64String);
        alert("Фото профиля успешно загружено!");
      } catch (error) {
        alert("Ошибка: " + error.message);
      }
    };
    reader.readAsDataURL(file);
  };

  // перенос
  const startReschedule = (b) => {
    setRescheduleId(b.id);
    setRescheduleDate(b.date || minDate);
    setRescheduleTime(b.time || "");
  };
  const cancelReschedule = () => {
    setRescheduleId(null);
    setRescheduleDate("");
    setRescheduleTime("");
  };
  const saveReschedule = async () => {
    if (!rescheduleDate || !rescheduleTime) return alert("Выберите дату и время.");
    setSaving(true);
    try {
      await db.collection("bookings").doc(rescheduleId).update({
        date: rescheduleDate,
        time: rescheduleTime,
        updatedAt: new Date(),
      });
      setUserBookings((prev) =>
        prev.map((b) => (b.id === rescheduleId ? { ...b, date: rescheduleDate, time: rescheduleTime } : b))
      );
      cancelReschedule();
    } catch (e) {
      alert("Ошибка при переносе записи: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="auth-modal" style={{ display: "block" }}>
      <div className="auth-modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>

        <section className="auth-section">
          <h1>Профиль</h1>

          <div style={{ marginTop: 10, textAlign: "center", color: "#fff" }}>
            <span style={{ opacity: 0.85 }}>{user.email}</span>
          </div>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <img
              src={profilePicture}
              alt="Фото профиля"
              style={{
                width: 100, height: 100, borderRadius: "50%",
                objectFit: "cover", border: "2px solid rgb(202,93,102)", marginBottom: 10,
              }}
            />
            <input
              type="file" id="profile-picture-input" accept="image/*"
              style={{ display: "none" }} onChange={handleProfilePictureUpload}
            />
            <button
              onClick={() => document.getElementById("profile-picture-input").click()}
              className="btn-primary" style={{ width: "auto", margin: "0 auto", display: "block" }}
            >
              Загрузить фото
            </button>
          </div>

          <button onClick={handleLogout} className="btn-primary" style={{ display: "block", margin: "20px auto" }}>
            Выйти
          </button>

          <section className="booking-list-section" style={{ marginTop: 20, textAlign: "center", color: "white" }}>
            <h2>Мои записи</h2>

            {loading ? (
              <p>Загрузка…</p>
            ) : (
              <div id="user-bookings-display" style={{ display: "grid", gap: 12 }}>
                {userBookings.length > 0 ? (
                  userBookings.map((b) => (
                    <div key={b.id} className="booking-card" style={{ padding: 12, background: "rgba(255,255,255,0.06)", borderRadius: 8 }}>
                      <h3>{b.service}{b.subService ? ` • ${b.subService}` : ""}</h3>
                      <p>Дата: {b.date || "—"}</p>
                      <p>Время: {b.time || "—"}</p>
                      {typeof b.price === "number" && <p>Стоимость: {b.price.toLocaleString("ru-RU")} ₽</p>}

                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button className="btn-primary" onClick={() => startReschedule(b)}>Перенести</button>
                        <button className="cancel-booking-btn" onClick={() => handleCancelBooking(b.id)}>Отменить</button>
                      </div>

                      {rescheduleId === b.id && (
                        <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.08)" }}>
                          <div className="form-group" style={{ marginBottom: 8 }}>
                            <label htmlFor={`res-date-${b.id}`}>Новая дата:</label>
                            <input
                              type="date" id={`res-date-${b.id}`} value={rescheduleDate}
                              min={minDate} onChange={(e) => setRescheduleDate(e.target.value)}
                            />
                          </div>
                          <div className="form-group" style={{ marginBottom: 8 }}>
                            <label htmlFor={`res-time-${b.id}`}>Новое время:</label>
                            <input
                              type="time" id={`res-time-${b.id}`} value={rescheduleTime}
                              onChange={(e) => setRescheduleTime(e.target.value)} step="1800"
                            />
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button className="btn-primary" onClick={saveReschedule} disabled={saving}>
                              {saving ? "Сохраняем…" : "Сохранить"}
                            </button>
                            <button className="cancel-booking-btn" onClick={cancelReschedule}>Отмена</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  noBookingsMessage && <p>У вас пока нет записей.</p>
                )}
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default ProfileModal;
