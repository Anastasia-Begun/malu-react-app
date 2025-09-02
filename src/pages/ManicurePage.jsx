import React from "react";
import SpecialOffersManicure from "../components/SpecialOffersManicure";
import Footer from "../components/footer";

const ManicurePage = ({ onSelectOffer }) => {
  return (
    <>
      <section className="hero" aria-label="Основной блок">
        <div className="hero-left">
          <h1>Маникюр</h1>
          <p>
            Позвольте вашим рукам быть идеальными. Мы предлагаем широкий спектр услуг по уходу за ногтями,
            от классического маникюра до сложных дизайнов. Наши мастера используют только лучшие материалы
            и стерильные инструменты.
          </p>
        </div>

        <div className="hero-right" aria-label="Изображение маникюра">
          <img src="img/manicure-hero.jpg" alt="Процедура маникюра" />
        </div>
      </section>

      <div className="innovations">
        <div className="innovations-left">
          <div className="innovations-left-text">
            <div className="innovations-left-text-content">
              <button className="innovations-button">Новые техники</button>
              <p>Откройте для себя последние тренды и инновационные подходы в дизайне ногтей.</p>
              </div>
            <img src="img/manicure_innovation.jpg" alt="Применение новой техники маникюра" />
          </div>
        </div>
        <div className="innovations-right">
          <div className="innovations-text">
            <button className="innovations-button">Искусство маникюра</button>
            <div className="innovations-numbers">
              <p>
                30+ <span>Видов маникюра для любого стиля</span>
              </p>
              <p>
                10+ <span>Опытных мастеров маникюра</span>
              </p>
              <p style={{ fontSize: "72px" }}>
                5 <span>Международных наград за дизайн ногтей</span>
              </p>
              <p>
                500+ <span>Довольных клиентов каждый месяц</span>
              </p>
            </div>
            <div />
          </div>
          <img src="img/certificate_manicure.png" alt="Сертификат мастера маникюра" />
        </div>
      </div>

      <section className="news-section">
        <div className="news-left">
          <button className="news-button">Советы мастеров</button>
          <h2 className="news-left-title">
            Как ухаживать за ногтями, чтобы они всегда были крепкими и здоровыми.
          </h2>
          <p>Наши мастера делятся секретами поддержания здоровья и красоты ваших ногтей.</p>
          <p>Узнайте о последних тенденциях и продуктах для идеального маникюра.</p>
        </div>
        <div className="news-right">
          <h2>Преимущества профессионального маникюра. Мнение специалистов центра</h2>
          <ul>
            <li>
              Профессиональный маникюр обеспечивает не только красоту, но и здоровье ногтей и кожи рук.
            </li>
            <li>
              Использование качественных материалов и стерильных инструментов предотвращает повреждения и инфекции.
            </li>
            <li>
              Опытный мастер подберет идеальный уход и дизайн, соответствующий вашим предпочтениям и стилю.
            </li>
            <li>
              Регулярный профессиональный маникюр помогает поддерживать руки в идеальном состоянии, придавая им
              ухоженный вид.
            </li>
          </ul>
        </div>
      </section>

      {/* Слайдер спецпредложений по маникюру */}
      <SpecialOffersManicure onSelectOffer={onSelectOffer} />

      <Footer />
    </>
  );
};

export default ManicurePage;
