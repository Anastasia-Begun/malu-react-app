import React from "react";
import SpecialOffers from "../components/SpecialOffers";

const HaircutPage = ({ onSelectOffer }) => {
  return (
    <>
      <section className="hero" aria-label="Основной блок">
        <div className="hero-left">
          <h1>Стрижка волос</h1>
          <p>
            Наши мастера создадут для вас идеальную стрижку, которая подчеркнет
            индивидуальность и стиль. Мы используем современные техники и
            профессиональные средства для ваших волос.
          </p>
        </div>

        <div className="hero-right" aria-label="Изображение стрижки">
          <img src="img/hair-hero.jpg" alt="Процесс стрижки" />
        </div>
      </section>

      <div className="innovations">
        <div className="innovations-left">
          <div className="innovations-left-text">
            <div className="innovations-left-text-content">
              <button className="innovations-button">Современные тренды</button>
              <p>
                Узнайте о последних новинках и тенденциях в мире парикмахерского
                искусства.
              </p>
            </div>
            <img
              src="img/haircut-innovation.jpg"
              alt="Новая техника стрижки"
            />
          </div>
        </div>
        <div className="innovations-right">
          <div className="innovations-text">
            <button className="innovations-button">Профессионализм</button>
            <div className="innovations-numbers">
              <p>
                40+ <span>Видов стрижек для мужчин и женщин</span>
              </p>
              <p>
                12 <span>Опытных стилистов</span>
              </p>
              <p style={{ fontSize: "72px" }}>
                7 <span>Лет опыта</span>
              </p>
              <p>
                700+ <span>Довольных клиентов ежемесячно</span>
              </p>
            </div>
            <div />
          </div>
          <img src="img/certificate_hair.png" alt="Сертификат стилиста" />
        </div>
      </div>

      <section className="news-section">
        <div className="news-left">
          <button className="news-button">Советы стилистов</button>
          <h2 className="news-left-title">
            Как выбрать стрижку, подходящую именно вам.
          </h2>
          <p>
            Наши специалисты помогут подобрать образ, который подчеркнет вашу
            индивидуальность.
          </p>
          <p>
            Узнайте о современных тенденциях в стрижке и уходе за волосами.
          </p>
        </div>
        <div className="news-right">
          <h2>Преимущества профессиональной стрижки</h2>
          <ul>
            <li>
              Качественная стрижка обеспечивает аккуратный и стильный внешний
              вид.
            </li>
            <li>
              Профессионалы учитывают структуру волос и форму лица для лучшего
              результата.
            </li>
            <li>
              Используются современные техники и профессиональные инструменты.
            </li>
            <li>
              После стрижки волосы выглядят ухоженными и здоровыми.
            </li>
          </ul>
        </div>
      </section>

      {/* Слайдер спецпредложений для стрижек */}
       <SpecialOffers onSelectOffer={onSelectOffer} />

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
            <li><a href="#">Педикюр</a></li>
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

export default HaircutPage;
