import React, {useState} from 'react';
import 'swiper/swiper-bundle.css';
import Slider from './slider';
import {number} from 'prop-types';

function PromoBlock({mapY}) {
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
      <Slider onSlideChange={onSlideChange} mapY={mapY}/>
    </section>
  );
}

PromoBlock.propTypes = {
  mapY: number.isRequired,
};

export default PromoBlock;
