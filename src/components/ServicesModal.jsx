import React, { useEffect, useMemo, useState } from "react";
import { useFirebase } from "../firebase/FirebaseContext";

/**
 * Использование:
 * <ServicesModal
 *   isOpen={showServicesModal}
 *   onClose={() => setShowServicesModal(false)}
 *   initialService="manicure"              // например, из клика по карточке
 *   initialSubService="gel"                // "day" | "evening" | "bridal" | "women" | "men" | "kids" | ...
 * />
 */
const ServicesModal = ({ isOpen, onClose, initialService, initialSubService }) => {
  const { db, user } = useFirebase();

  const [service, setService] = useState("makeup");
  const [subService, setSubService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookingConfirmationMessage, setBookingConfirmationMessage] = useState("");

  // Прайс-лист и подпункты
  const SERVICES = {
    makeup: {
      label: "Макияж",
      options: {
        day: { label: "Дневной", price: 1800 },
        evening: { label: "Вечерний", price: 3900 },
        bridal: { label: "Свадебный", price: 6800 },
      },
    },
    haircut: {
      label: "Стрижка волос",
      options: {
        women: { label: "Женская", price: 3500 },
        men: { label: "Мужская", price: 2000 },
        kids: { label: "Детская", price: 1800 },
      },
    },
    manicure: {
      label: "Маникюр",
      options: {
        classic: { label: "Классический", price: 1900 },
        gel: { label: "Гель-лак", price: 2400 },
        extension: { label: "Наращивание", price: 3300 },
        design: { label: "Дизайн ногтей", price: 2700 },
      },
    },
    pedicure: {
      label: "Педикюр",
      options: {
        classic: { label: "Классический", price: 1600 },
        hardware: { label: "Аппаратный", price: 2400 },
        spa: { label: "SPA", price: 3600 },
        medical: { label: "Лечебный", price: 3800 },
      },
    },
  };

  // Минимально возможная дата — сегодня
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Цена выбранного подпункта
  const selectedPrice = useMemo(() => {
    if (!service || !subService) return 0;
    return SERVICES[service].options[subService]?.price ?? 0;
  }, [service, subService]);

  // Применяем пресет при ОТКРЫТИИ модалки (или при изменении initial*)
  useEffect(() => {
    if (!isOpen) return;

    // если пришли валидные initialService/initialSubService — ставим их
    if (initialService && SERVICES[initialService]) {
      setService(initialService);
      const hasSub =
        initialSubService && SERVICES[initialService].options[initialSubService];
      const firstSubKey = Object.keys(SERVICES[initialService].options)[0];
      setSubService(hasSub ? initialSubService : firstSubKey);
    } else {
      // без пресета — используем текущую услугу и её первый подпункт
      const firstSubKey = Object.keys(SERVICES[service].options)[0];
      setSubService(firstSubKey);
    }

    // сбрасываем поля даты/времени/сообщения при каждом открытии
    setDate("");
    setTime("");
    setBookingConfirmationMessage("");
  }, [isOpen, initialService, initialSubService]); // намеренно НЕ включаем service, чтобы не сбивать выбранное вручную

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!service || !subService || !date || !time) {
      setBookingConfirmationMessage("Ошибка: выберите услугу, подпункт, дату и время.");
      return;
    }

    if (!user) {
      alert("Пожалуйста, войдите, чтобы записаться.");
      onClose();
      return;
    }

    try {
      await db.collection("bookings").add({
        userId: user.uid,
        userEmail: user.email,
        service,              // "makeup" | "haircut" | "manicure" | "pedicure"
        subService,           // ключ подпункта (например, "gel", "women", "day", ...)
        price: selectedPrice,
        date,                 // YYYY-MM-DD
        time,                 // HH:mm
        timestamp: new Date()
      });

      setBookingConfirmationMessage("Запись успешно создана!");
      setTimeout(() => {
        setBookingConfirmationMessage("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Ошибка при создании записи:", error);
      setBookingConfirmationMessage("Ошибка при создании записи: " + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal" style={{ display: "block" }}>
      <div className="auth-modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>

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
            <form
              onSubmit={handleBookingSubmit}
              style={{ marginTop: 20, textAlign: "left", display: "grid", gap: 16 }}
            >
              {/* Услуга */}
              <div className="form-group">
                <label htmlFor="service-select">Выберите услугу:</label>
                <select
                  id="service-select"
                  value={service}
                  onChange={(e) => {
                    const val = e.target.value;
                    setService(val);
                    // ставим первый подпункт выбранной услуги
                    const firstSubKey = Object.keys(SERVICES[val].options)[0];
                    setSubService(firstSubKey);
                  }}
                  style={{
                    width: "100%", padding: 10, borderRadius: 5,
                    border: "1px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.1)", color: "#111",
                  }}
                >
                  {Object.entries(SERVICES).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
              </div>

              {/* Подпункт */}
              <div className="form-group">
                <label htmlFor="subservice-select">Выберите тип:</label>
                <select
                  id="subservice-select"
                  value={subService}
                  onChange={(e) => setSubService(e.target.value)}
                  style={{
                    width: "100%", padding: 10, borderRadius: 5,
                    border: "1px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.1)", color: "#111",
                  }}
                >
                  {Object.entries(SERVICES[service].options).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label} — {val.price} ₽
                    </option>
                  ))}
                </select>
              </div>

              {/* Дата */}
              <div className="form-group">
                <label htmlFor="date-select">Выберите дату:</label>
                <input
                  type="date"
                  id="date-select"
                  value={date}
                  min={minDate}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: "100%", padding: 10, borderRadius: 5,
                    border: "1px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.1)", color: "#111",
                  }}
                />
              </div>

              {/* Время */}
              <div className="form-group">
                <label htmlFor="time-select">Выберите время:</label>
                <input
                  type="time"
                  id="time-select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  step="1800" // шаг 30 минут
                  style={{
                    width: "100%", padding: 10, borderRadius: 5,
                    border: "1px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.1)", color: "#111",
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: "center" }}>
                Записаться
              </button>
            </form>

            {/* Сообщение об ошибке/успехе */}
            {bookingConfirmationMessage && (
              <p
                style={{
                  marginTop: 15,
                  color: bookingConfirmationMessage.startsWith("Ошибка") ? "red" : "lightgreen",
                }}
              >
                {bookingConfirmationMessage}
              </p>
            )}

            {/* Блок итоговой цены */}
            {subService && SERVICES[service].options[subService] && (
              <div
                aria-live="polite"
                style={{
                  marginTop: 16, padding: "12px 14px",
                  background: "rgba(255,255,255,0.15)", borderRadius: 8,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <div>
                  <strong>Стоимость:</strong>{" "}
                  {SERVICES[service].options[subService].label} —{" "}
                  <span style={{ fontWeight: 700 }}>
                    {selectedPrice.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesModal;
