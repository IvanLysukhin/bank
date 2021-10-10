import React from 'react';
import {func} from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Pagination, Autoplay]);

const SLIDE_TIMEOUT = 4000;

function Slider ({onSlideChange}) {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      autoplay={{delay: SLIDE_TIMEOUT}}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={onSlideChange}
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
        <div className="promo-block__wrapper promo-block__wrapper--slide-1">
          <div className="promo-block__content-wrapper">
            <h2 className="app__title promo-block__title promo-block__title--dark">
              <span className="promo-block__big-text">Лига Банк</span><br/>
              Ваша уверенность в завтрашнем дне
            </h2>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="promo-block__wrapper promo-block__wrapper--slide-2">
          <div className="promo-block__content-wrapper promo-block__content-wrapper--slide-2">
            <h2 className="app__title promo-block__title app__title promo-block__title--dark">
              <span className="promo-block__big-text">Лига Банк</span><br/>
              Всегда рядом
            </h2>
            <a className="app__link promo-block__link promo-block__link--blue promo-block__link--wide" href="#">Найти отделение</a>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

Slider.propTypes = {
  onSlideChange: func.isRequired,
};

export default Slider;
