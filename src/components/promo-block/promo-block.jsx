import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';


SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);
function PromoBlock() {
  return (
    <section className="app__section promo-block">
      <Swiper
        pagination
        spaceBetween={0}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="promo-block__wrapper">
            <div className="promo-block__content-wrapper">
              <h2 className="app__title promo-block__title">
                <span className="promo-block__big-text">Лига Банк</span><br/>
                Кредиты на любой случай
              </h2>
              <a className="app__link promo-block__link" href="#">Рассчитать кредит</a>
              <img className="promo-block__pic" src="../../img/promo-cards.png" width="444" height="286" alt="Credit promo, two cards"/>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="promo-block__wrapper promo-block__wrapper--slide-2">
            <div className="promo-block__content-wrapper">
              <h2 className="app__title promo-block__title">
                <span className="promo-block__big-text">Лига Банк</span><br/>
                Кредиты на любой случай
              </h2>
              <a className="app__link promo-block__link" href="#">Рассчитать кредит</a>
              {/*<img className="promo-block__pic" src="../../img/promo-cards.png" width="444" height="286" alt="Credit promo, two cards"/>*/}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="promo-block__wrapper">
            <div className="promo-block__content-wrapper">
              <h2 className="app__title promo-block__title">
                <span className="promo-block__big-text">Лига Банк</span><br/>
                Кредиты на любой случай
              </h2>
              <a className="app__link promo-block__link" href="#">Рассчитать кредит</a>
              <img className="promo-block__pic" src="../../img/promo-cards.png" width="444" height="286" alt="Credit promo, two cards"/>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default PromoBlock;
