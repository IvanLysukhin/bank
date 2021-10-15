import React from 'react';
import {func, number} from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Pagination, Autoplay]);

const SLIDE_TIMEOUT = 4000;

function Slider ({onSlideChange, mapY}) {

  const locationBtnClick = (evt) => {
    evt.preventDefault();
    console.log(mapY);
    window.scrollBy(0, mapY);
  };

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
        <div className="promo-block__wrapper promo-block__wrapper--slide-0">
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
            <h2 className="app__title promo-block__title promo-block__title--dark promo-block__title--short">
              <span className="promo-block__big-text">Лига Банк</span><br/>
              Ваша уверенность <br className="promo-block__title-shift"/> в завтрашнем дне
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
            <a
              className="app__link promo-block__link promo-block__link--blue promo-block__link--wide"
              href="/"
              onClick={locationBtnClick}
            >
              Найти отделение
            </a>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

Slider.propTypes = {
  onSlideChange: func.isRequired,
  mapY: number.isRequired,
};

export default Slider;
