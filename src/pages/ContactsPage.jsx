import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer.jsx';

const ContactsPage = () => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  // Если раньше был редирект с ?sent=1 — покажем плашку (не обязательно)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('sent') === '1') setSent(true);
  }, []);

  // AJAX-отправка в FormSubmit (без перезагрузки)
  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSent(false);
    setSending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // honeypot — если заполнен, тихо выходим
    if (fd.get('_honey')) {
      setSending(false);
      return;
    }

    try {
      const endpoint = "https://formsubmit.co/ajax/begun0anastasia1@gmail.com";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" }, // FormSubmit вернёт JSON
        body: fd, // не ставим Content-Type вручную — FormData проставит сам
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Ошибка сети (${res.status})`);
      }

      // Можно проверить JSON при желании:
      // const data = await res.json();

      form.reset();
      setSent(true);
    } catch (e) {
      setErr(e.message || "Не удалось отправить сообщение");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <section className="contact-hero">
        <h1>Контакты</h1>
        <p>Свяжитесь с нами для записи или консультации.</p>
      </section>

      <section className="contact-details">
        <div className="contact-item">
          <h3>Телефон</h3>
          <p>+7 (999) 999-99-99</p>
          <p>+7 (888) 888-88-88</p>
        </div>
        <div className="contact-item">
          <h3>Email</h3>
          <p>info@malu.com</p>
        </div>
        <div className="contact-item">
          <h3>Адрес</h3>
          <p>Невский пр. 140, Санкт-Петербург</p>
          <a
            href="https://maps.app.goo.gl/WTcX5jC8JLoBCGY57"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            ПОКАЗАТЬ НА КАРТЕ
          </a>
        </div>
        <div className="contact-item">
          <h3>Часы работы</h3>
          <p>Пн-Пт: 9:00 - 21:00</p>
          <p>Сб: 10:00 - 19:00</p>
          <p>Вс: Выходной</p>
        </div>
      </section>

      <section className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.7107773295254!2d30.36982991609139!3d59.93049188187807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696317d6e5a5f11%3A0xc3f7a6b9f2e7f3a!2z0L3QsNCx0L3RgNC40L3RgdC60LDRjyDQntC00LXRgNGL0LLQsCwgMTQwLCDQodCw0L3QutGCLdCf0LXRgtCw0LvQuNC60LDRgtCw0YbRjNC60L4sINCj0YPQvdGB0LrQvtCz0L7QstGB0LrQsNGPINC-0LHQu9Cw0YHQvtGW0LLQvg!5e0!3m2!1sru!2sru!4v1678822290000!5m2!1sru!2sru"
          width="100%"
          height="450"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Карта офиса"
        />
      </section>

      <section className="contact-form-section">
        <h2>Отправьте нам сообщение</h2>

        {/* Статусы отправки */}
        {sent && (
          <div style={{ margin: '8px 0 16px', color: '#2a7' }}>
            Сообщение отправлено ✔
          </div>
        )}
        {err && (
          <div style={{ margin: '8px 0 16px', color: '#f55' }}>
            Ошибка: {err}
          </div>
        )}

        <form onSubmit={onSubmit} className="contact-form" acceptCharset="UTF-8">
          {/* служебные поля FormSubmit */}
          <input type="hidden" name="_subject" value="Новое сообщение с формы" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_autoresponse"
            value="Спасибо! Мы получили ваше сообщение и скоро ответим."
          />
          {/* honeypot */}
          <input
            type="text"
            name="_honey"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="form-group">
            <label htmlFor="name">Ваше имя:</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Ваш Email:</label>
            {/* _replyto — чтобы у письма был корректный Reply-To */}
            <input type="email" id="email" name="_replyto" required />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Тема:</label>
            <input type="text" id="subject" name="subject" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Сообщение:</label>
            <textarea id="message" name="message" rows="6" required />
          </div>

          <button type="submit" className="btn-primary" disabled={sending}>
            {sending ? "ОТПРАВКА..." : "ОТПРАВИТЬ"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default ContactsPage;
