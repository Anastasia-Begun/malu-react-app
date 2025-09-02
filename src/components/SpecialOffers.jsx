import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SpecialOffers = ({ onSelectOffer }) => {
  const pick = (subKey) => {
    if (typeof onSelectOffer === "function") {
      onSelectOffer({ service: "haircut", subService: subKey });
    }
  };

  return (
    <section className="special-offers">
      <h2>Актуальные спецпредложения по стрижке волос</h2>

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
        aria-label="Спецпредложения по стрижке"
      >
        <SwiperSlide>
          <div className="offer-card">
            <img src="img/haircut-women.jpg" alt="Женская стрижка" />
            <button className="offer-category" type="button">Стрижка</button>
            <div
              className="offer-info"
              data-service="haircut"
              role="button"
              tabIndex={0}
              onClick={() => pick("women")}
              onKeyDown={(e) => e.key === "Enter" && pick("women")}
              aria-label="Записаться на Модельную женскую стрижку"
            >
              <h3>Модельная женская стрижка</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/haircut-men.jpg" alt="Мужская стрижка" />
            <button className="offer-category" type="button">Стрижка</button>
            <div
              className="offer-info"
              data-service="haircut"
              role="button"
              tabIndex={0}
              onClick={() => pick("men")}
              onKeyDown={(e) => e.key === "Enter" && pick("men")}
              aria-label="Записаться на Креативную мужскую стрижку"
            >
              <h3>Креативная мужская стрижка</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/haircut-children.jpg" alt="Детская стрижка" />
            <button className="offer-category" type="button">Стрижка</button>
            <div
              className="offer-info"
              data-service="haircut"
              role="button"
              tabIndex={0}
              onClick={() => pick("kids")}
              onKeyDown={(e) => e.key === "Enter" && pick("kids")}
              aria-label="Записаться на Детскую стрижку"
            >
              <h3>Детская стрижка</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="offer-card">
            <img src="img/haircut-stylish.jpg" alt="Стрижка с укладкой" />
            <button className="offer-category" type="button">Стрижка</button>
            <div
              className="offer-info"
              data-service="haircut"
              role="button"
              tabIndex={0}
              onClick={() => pick("women")}  // при желании замени на отдельный subService
              onKeyDown={(e) => e.key === "Enter" && pick("women")}
              aria-label="Записаться на Стрижку с укладкой"
            >
              <h3>Стрижка с укладкой</h3>
              <span className="offer-arrow" aria-hidden>→</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default SpecialOffers;
