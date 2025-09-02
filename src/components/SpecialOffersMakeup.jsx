import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SpecialOffersMakeup = ({ onSelectOffer }) => {
  const pick = (subKey) => {
    if (typeof onSelectOffer === "function") {
      onSelectOffer({ service: "makeup", subService: subKey });
    }
  };

  return (
    <section className="special-offers">
      <h2>Актуальные спецпредложения</h2>

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
        aria-label="Спецпредложения по макияжу"
      >
        <SwiperSlide>
          <div className="offer-card">
            <img src="img/makeup1.jpg" alt="Вечерний макияж" />
            <button className="offer-category" type="button">Макияж</button>
            <div
              className="offer-info"
              data-service="makeup"
              role="button"
              tabIndex={0}
              onClick={() => pick("evening")}
              onKeyDown={(e) => e.key === "Enter" && pick("evening")}
              aria-label="Записаться на Вечерний макияж"
            >
              <h3>Вечерний макияж</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/makeup2.jpg" alt="Свадебный макияж" />
            <button className="offer-category" type="button">Макияж</button>
            <div
              className="offer-info"
              data-service="makeup"
              role="button"
              tabIndex={0}
              onClick={() => pick("bridal")}
              onKeyDown={(e) => e.key === "Enter" && pick("bridal")}
              aria-label="Записаться на Свадебный макияж"
            >
              <h3>Свадебный макияж</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/makeup3.jpg" alt="Дневной макияж" />
            <button className="offer-category" type="button">Макияж</button>
            <div
              className="offer-info"
              data-service="makeup"
              role="button"
              tabIndex={0}
              onClick={() => pick("day")}
              onKeyDown={(e) => e.key === "Enter" && pick("day")}
              aria-label="Записаться на Дневной макияж"
            >
              <h3>Дневной макияж</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/makeup-hero.jpg" alt="Nude макияж" />
            <button className="offer-category" type="button">Макияж</button>
            <div
              className="offer-info"
              data-service="makeup"
              role="button"
              tabIndex={0}
              onClick={() => pick("day")}  // можно заменить на отдельный subService, если добавишь его в ServicesModal
              onKeyDown={(e) => e.key === "Enter" && pick("day")}
              aria-label="Записаться на Nude макияж"
            >
              <h3>Nude макияж</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default SpecialOffersMakeup;
