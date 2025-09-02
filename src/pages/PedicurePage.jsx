import React from "react";
import SpecialOffersPedicure from "../components/SpecialOffersPedicure";

const PedicurePage = ({ onSelectOffer }) => {
  return (
    <>
      <section className="hero" aria-label="Основной блок">
        <div className="hero-left">
          <h1>Педикюр</h1>
          <p>
            Подарите своим ногам заслуженный уход с профессиональным педикюром.
            Мы заботимся о здоровье и красоте ваших стоп и ногтей, подбирая
            оптимальные техники и средства под ваши задачи.
          </p>
        </div>

        <div className="hero-right" aria-label="Изображение педикюра">
          <img src="img/pedicure-hero.jpg" alt="Процедура педикюра" />
        </div>
      </section>

      <div className="innovations">
        <div className="innovations-left">
          <div className="innovations-left-text">
            <div className="innovations-left-text-content">
              <button className="innovations-button">Новые методики</button>
              <p>
                Мы используем современные инструменты и техники ухода за стопами,
                чтобы обеспечить безопасность и долговечный результат.
              </p>
            </div>
            <img
              src="img/pedicure-innovation.jpg"
              alt="Применение новой методики педикюра"
            />
          </div>
        </div>

        <div className="innovations-right">
          <div className="innovations-text">
            <button className="innovations-button">Здоровье и красота стоп</button>
            <div className="innovations-numbers">
              <p>
                15+ <span>Видов педикюра для любых задач</span>
              </p>
              <p>
                8+ <span>Опытных мастеров педикюра</span>
              </p>
              <p style={{ fontSize: "72px" }}>
                3 <span>Международных сертификата качества</span>
              </p>
              <p>
                300+ <span>Довольных клиентов каждый месяц</span>
              </p>
            </div>
            <div />
          </div>
          <img src="img/certificate_pedicure.png" alt="Сертификат мастера педикюра" />
        </div>
      </div>

      <section className="news-section">
        <div className="news-left">
          <button className="news-button">Советы подологов</button>
          <h2 className="news-left-title">
            Как ухаживать за ногами в домашних условиях.
          </h2>
          <p>
            Наши специалисты делятся рекомендациями по профилактике проблем стоп,
            уходу за ногтями и поддержанию комфорта при ежедневной нагрузке.
          </p>
          <p>
            Узнайте, когда необходим профессиональный уход и как продлить эффект
            после процедуры.
          </p>
        </div>
        <div className="news-right">
          <h2>Преимущества профессионального педикюра</h2>
          <ul>
            <li>
              Комплексный уход предотвращает мозоли, натоптыши и вросшие ногти.
            </li>
            <li>
              Стерильные инструменты и проверенные средства — безопасная процедура.
            </li>
            <li>
              Улучшение кровообращения и ощущение лёгкости после сеанса.
            </li>
            <li>
              Ухоженный внешний вид и комфорт каждый день.
            </li>
          </ul>
        </div>
      </section>

      {/* Слайдер спецпредложений по педикюру */}
      <SpecialOffersPedicure onSelectOffer={onSelectOffer} />

      <section className="footer-section">
        <div className="footer-column">
          <h4>Услуги</h4>
          <ul>
            <li><a href="#">Макияж</a></li>
            <li><a href="#">Маникюр</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Услуги</h4>
          <ul>
            <li><a href="#">Стрижка волос</a></li>
            <li><a href="#">Укладка волос</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Телефон</h4>
          <p className="contact-info">+7 (999) 999-99-99</p>
        </div>

        <div className="footer-column">
          <h4>Адрес</h4>
          <p className="contact-info">Невский пр. 140</p>
        </div>
      </section>
    </>
  );
};

export default PedicurePage;
