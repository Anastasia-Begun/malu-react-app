import React from "react";
import SpecialOffers from "../components/SpecialOffers"; // твой домашний слайдер
import Footer from "../components/footer";

const HomePage = ({ onSelectOffer }) => {
  return (
    <>
      <section className="hero" aria-label="Основной блок">
        <div className="hero-left">
          <h1>Malu Beauty Studio</h1>
          <p>
            Добро пожаловать в Malu Beauty Studio, где красота встречается с искусством.
            Откройте для себя мир преображения с нашими эксклюзивными услугами.
          </p>
        </div>
        <div className="hero-right" aria-label="Изображение салона">
          <img src="img/malu.jpg" alt="Салон красоты" />
        </div>
      </section>

      {/* Слайдер спецпредложений на главной.
          Важно: внутри SpecialOffers на клике по .offer-info вызывай onSelectOffer({ service, subService }) */}
      <SpecialOffers onSelectOffer={onSelectOffer} />

      <Footer />
    </>
  );
};

export default HomePage;
