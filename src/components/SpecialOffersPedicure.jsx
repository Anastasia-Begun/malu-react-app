import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SpecialOffersPedicure = () => {
  return (
    <section className="special-offers">
      <h2>Актуальные спецпредложения по педикюру</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="offers-container"
        aria-label="Спецпредложения по педикюру"
      >
        <SwiperSlide>
          <div className="offer-card">
            <img src="img/pedicure-classic.jpg" alt="Классический педикюр" />
            <button className="offer-category" type="button">Педикюр</button>
            <div className="offer-info" data-service="pedicure">
              <h3>Классический педикюр</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/pedicure-hardware.jpg" alt="Аппаратный педикюр" />
            <button className="offer-category" type="button">Педикюр</button>
            <div className="offer-info" data-service="pedicure">
              <h3>Аппаратный педикюр</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/pedicure-spa.jpg" alt="SPA-педикюр" />
            <button className="offer-category" type="button">Педикюр</button>
            <div className="offer-info" data-service="pedicure">
              <h3>SPA-педикюр</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/pedicure-treatment.jpg" alt="Лечебный педикюр" />
            <button className="offer-category" type="button">Педикюр</button>
            <div className="offer-info" data-service="pedicure">
              <h3>Лечебный педикюр</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default SpecialOffersPedicure;
