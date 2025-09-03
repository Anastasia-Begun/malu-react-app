import React from "react";
import SpecialOffersMakeup from "../components/SpecialOffersMakeup";
import Footer from "../components/Footer.jsx";

const MakeupPage = ({ onSelectOffer }) => {
  return (
    <>
      <section className="hero" aria-label="Основной блок">
        <div className="hero-left">
          <h1>Макияж</h1>
          <p>
            Современный мир диктует новые каноны жизни: ухоженное лицо и тело,
            стрессоустойчивость, молодость фигуры — сегодня это не роскошь, а
            необходимость. Наши программы направлены на благополучие и красоту.
          </p>
        </div>

        <div className="hero-right" aria-label="Изображение процедуры">
          <img src="img/makeup-hero.jpg" alt="Процедура ухода за кожей лица" />
        </div>
      </section>

      <div className="innovations">
        <div className="innovations-left">
          <div className="innovations-left-text">
            <div className="innovations-left-text-content">
              <button className="innovations-button" type="button">Новые техники</button>
              <p>Откройте для себя последние тренды и инновационные подходы в макияже.</p>
              </div>
            <img src="img/makeup-innovation.jpg" alt="Применение новой техники макияжа" />
          </div>
        </div>

        <div className="innovations-right">
          <div className="innovations-text">
            <button className="innovations-button" type="button">Искусство макияжа</button>
            <div className="innovations-numbers">
              <p>50 <span>Видов макияжа для любого случая</span></p>
              <p>15 <span>Опытных визажистов в нашей команде</span></p>
              <p style={{ fontSize: '72px' }}>10 <span>Международных наград за мастерство</span></p>
              <p>1000+ <span>Довольных клиентов каждый год</span></p>
            </div>
            <div />
          </div>
          <img src="img/certificate.png" alt="Сертификат визажиста" />
        </div>
      </div>

      <section className="news-section">
        <div className="news-left">
          <button className="news-button" type="button">Советы визажистов</button>
          <h2 className="news-left-title">
            Как выбрать идеальный макияж для вашего типа лица. Рекомендации экспертов.
          </h2>
          <p>Наши визажисты делятся секретами подбора макияжа, который подчеркнёт вашу индивидуальность.</p>
          <p>Узнайте о последних тенденциях и техниках, чтобы всегда выглядеть безупречно.</p>
        </div>
        <div className="news-right">
          <h2>Преимущества профессионального макияжа. Мнение специалистов центра</h2>
          <ul>
            <li>Профессиональный макияж скрывает недостатки и подчёркивает достоинства, создавая гармоничный образ.</li>
            <li>Качественная косметика и инструменты обеспечивают стойкость на весь день или мероприятие.</li>
            <li>Опытный визажист подберёт макияж под ваш тип кожи, форму лица, цвет глаз и волос.</li>
            <li>Идеально подходит для свадьбы, фотосессии или деловой встречи.</li>
          </ul>
        </div>
      </section>

      {/* Слайдер спецпредложений по макияжу */}
      <SpecialOffersMakeup onSelectOffer={onSelectOffer} />

      {/* Общий футер */}
      <Footer />
    </>
  );
};

export default MakeupPage;
