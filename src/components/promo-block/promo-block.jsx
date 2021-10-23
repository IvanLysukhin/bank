import React, {useState} from 'react';
import 'swiper/swiper-bundle.css';
import Slider from './slider';
import {number, func} from 'prop-types';

function PromoBlock({mapY, scrollToCreditCalc}) {
  const [slide, setSlide] = useState(0);

  let promoBlockClass = '';

  switch (slide) {
    case 1:
      promoBlockClass = 'promo-block--slide-1';
      break;
    case 2:
      promoBlockClass = 'promo-block--slide-2';
      break;
    default:
      promoBlockClass = '';
      break;
  }

  const onSlideChange = ({activeIndex}) => {
    setSlide(activeIndex);
  };

  return (
    <section className={`app__section promo-block ${promoBlockClass}`}>
      <Slider onSlideChange={onSlideChange} mapY={mapY} scrollToCreditCalc={scrollToCreditCalc}/>
    </section>
  );
}

PromoBlock.propTypes = {
  mapY: number.isRequired,
  scrollToCreditCalc: func.isRequired,
};

export default PromoBlock;
