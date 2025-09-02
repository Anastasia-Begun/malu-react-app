import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SpecialOffersManicure = ({ onSelectOffer }) => {
  const pick = (subKey) => {
    onSelectOffer && onSelectOffer({ service: "manicure", subService: subKey });
  };

  return (
    <section className="special-offers">
      <h2>Актуальные спецпредложения по маникюру</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        breakpoints={{ 320:{slidesPerView:1},768:{slidesPerView:2},1024:{slidesPerView:3} }}
        className="offers-container"
      >
        <SwiperSlide>
          <div className="offer-card">
            <img src="img/manicure_classic.jpg" alt="Классический маникюр" />
            <button className="offer-category" type="button">Маникюр</button>
            <div className="offer-info" data-service="manicure" onClick={() => pick("classic")}>
              <h3>Классический маникюр</h3>
              <span className="offer-arrow">→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/manicure1.jpg" alt="Маникюр гель-лак" />
            <button className="offer-category" type="button">Маникюр</button>
            <div className="offer-info" data-service="manicure" onClick={() => pick("gel")}>
              <h3>Маникюр гель-лак</h3>
              <span className="offer-arrow">→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/manicure.jpg" alt="Наращивание ногтей" />
            <button className="offer-category" type="button">Маникюр</button>
            <div className="offer-info" data-service="manicure" onClick={() => pick("extension")}>
              <h3>Наращивание ногтей</h3>
              <span className="offer-arrow">→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/manicure_design.jpg" alt="Дизайн ногтей" />
            <button className="offer-category" type="button">Маникюр</button>
            <div className="offer-info" data-service="manicure" onClick={() => pick("design")}>
              <h3>Дизайн ногтей</h3>
              <span className="offer-arrow">→</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default SpecialOffersManicure;
