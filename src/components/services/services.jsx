import React,  {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {TabType} from '../../constants';

function Services() {
  const [tab, setTab] = useState(TabType.DEPOSIT);

  let element;


  switch(tab) {
    case (TabType.DEPOSIT):
      element = (
        <>
          <div className="services__info">
            <p className="services__info-text">Вклады Лига Банка – это выгодная<br/> инвестиция в свое будущее</p>
            <ul className="services__info-list">
              <li className="services__info-item">
               Проценты по вкладам до 7%
              </li>
              <li className="services__info-item">
                 Разнообразные условия
              </li>
              <li className="services__info-item">
               Возможность ежемесячной капитализации или вывод процентов на банковскую карту
              </li>
            </ul>
            <a className="services__info-btn" href="/">Узнать подробнее</a>
          </div>
          <div className="services__picture">
            <img src="../../img/piggybank.jpg" width="440" height="290" alt="Вклады"/>
          </div>
        </>
      );
      break;
    case (TabType.CREDIT):
      element = (
        <>
          <div className="services__info">
            <p className="services__info-text">Лига Банк выдает кредиты<br/> под любые цели</p>
            <ul className="services__info-list">
              <li className="services__info-item">
                Ипотечный кредит
              </li>
              <li className="services__info-item">
                Автокредит
              </li>
              <li className="services__info-item">
                Потребительский кредит
              </li>
            </ul>
            <p className="services__text">Рассчитайте ежемесячный платеж<br/> и ставку по кредиту воспользовавшись<br/> нашим
              <a className="services__info-text-link" href="/">&nbsp;кредитным калькулятором</a>
            </p>
          </div>
          <div className="services__picture services__picture--car">
            <img src="../../img/car.jpg" width="440" height="290" alt="Вклады"/>
          </div>
        </>
      );
      break;
    case (TabType.INSURANCE):
      element = (
        <>
          <div className="services__info">
            <p className="services__info-text">Лига Страхование — застрахуем<br/> все что захотите</p>
            <ul className="services__info-list">
              <li className="services__info-item">
                Автомобильное страхование
              </li>
              <li className="services__info-item">
                Страхование жизни и здоровья
              </li>
              <li className="services__info-item">
                Страхование недвижимости
              </li>
            </ul>
            <a className="services__info-btn" href="/">Узнать подробнее</a>
          </div>
          <div className="services__picture services__picture--lock">
            <img src="../../img/lock.png" width="440" height="290" alt="Вклады"/>
          </div>
        </>
      );
      break;
    case (TabType.ONLINE):
      element = (
        <>
          <div className="services__info">
            <p className="services__info-text">Лига Банк — это огромное количество онлайн-сервисов для вашего удобства</p>
            <ul className="services__info-list">
              <li className="services__info-item">
                Мобильный банк,<br/>
                который всегда под рукой
              </li>
              <li className="services__info-item">
                Приложение Лига-проездной позволит<br/>
                вам оплачивать билеты по всему миру
              </li>
            </ul>
            <a className="services__info-btn" href="/">Узнать подробнее</a>
          </div>
          <div className="services__picture services__picture--phone">
            <img src="../../img/phone.png" width="440" height="290" alt="Вклады"/>
          </div>
        </>
      );
      break;
  }

  const getActiveClass = (tabName, currentTab) => tabName === currentTab ? 'services__tab services__tab--current' : 'services__tab';

  const tabClickHandler = (tabName) => {
    setTab(tabName);
  };

  return (
    <section className="services">
      <ul className="services__tabs-list">
        <li
          className={getActiveClass(TabType.DEPOSIT, tab)}
          onClick={() => {
            tabClickHandler(TabType.DEPOSIT);
          }}
          onFocus={() => {
            tabClickHandler(TabType.DEPOSIT);
          }}
        >
          <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http:www.w3.org/2000/svg">
            <path d="M4.20734 26.063H29.7924V4.36579H4.20734V26.063ZM12.8681 11.7959C14.4742 11.7959 15.8268 12.8933 16.2055 14.3724H23.727V16.056H16.2055C15.8267 17.5352 14.4742 18.6327 12.8681 18.6327C10.9695 18.6327 9.42492 17.0991 9.42492 15.2142C9.42483 13.3294 10.9695 11.7959 12.8681 11.7959Z" fill="#2C36F2"/>
            <path d="M0 0V30.4287H2.48008V33H5.44779V30.4287H28.5522V33H31.5199V30.4287H34V0H0ZM2.51162 27.7466V2.68218H31.4884V27.7466H2.51162Z" fill="#2C36F2"/>
          </svg>
          <span className="services__tab-text">Вклады</span>
        </li>
        <li
          className={getActiveClass(TabType.CREDIT, tab)}
          onClick={() => {
            tabClickHandler(TabType.CREDIT);
          }}
          onFocus={() => {
            tabClickHandler(TabType.CREDIT);
          }}
        >
          <svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http:www.w3.org/2000/svg">
            <path d="M32.7022 4.39716L11.8788 0.0350432C10.9978 -0.149457 10.1246 0.413172 9.93822 1.28524L9.54261 3.80181L33.5692 8.83467L33.9649 6.31811C34.1512 5.44636 33.5832 4.58172 32.7022 4.39716Z" fill="#565EF5"/>
            <path d="M23.9451 9.36838C23.7019 8.50137 22.7865 7.98889 21.9109 8.22926L17.9579 9.31553L8.63885 7.3633L7.61395 12.1567L1.21035 13.916C0.334793 14.1565 -0.182933 15.0625 0.0599021 15.9293L3.6687 28.8018C3.91193 29.6685 4.82732 30.1813 5.70288 29.9406L26.4035 24.2542C27.279 24.0134 27.7967 23.1077 27.5539 22.2406L26.9345 20.0308L29.2561 20.5167C30.1371 20.7015 31.0103 20.1389 31.1967 19.2668L32.6656 12.3962L24.3029 10.6445L23.9451 9.36838ZM26.3357 15.9107L26.8477 13.5157C26.9246 13.1571 27.2838 12.9258 27.646 13.0015L30.0656 13.5086C30.4282 13.5847 30.6619 13.9399 30.5854 14.2988L30.0734 16.6939C29.9965 17.0525 29.6374 17.2841 29.2751 17.2081L26.8555 16.7013C26.4926 16.6249 26.2589 16.2693 26.3357 15.9107ZM1.57058 15.2006L22.2704 9.51455C22.297 9.50745 22.3235 9.5041 22.3494 9.5041C22.466 9.5041 22.6055 9.57988 22.6463 9.72501L23.3522 12.2422L2.0638 18.0899L1.35797 15.573C1.31374 15.4151 1.41108 15.2444 1.57058 15.2006ZM26.2558 22.5968C26.283 22.6945 26.2545 22.7753 26.2255 22.8258C26.197 22.8763 26.1418 22.9424 26.0432 22.9692L5.34299 28.6556C5.31682 28.6627 5.28994 28.6664 5.26405 28.6664C5.14738 28.6664 5.00788 28.5903 4.9671 28.4452L2.8622 20.9368L24.1506 15.0888L26.2558 22.5968Z" fill="#565EF5"/>
            <path d="M8.68804 23.1106C8.58871 22.7571 8.21587 22.5483 7.8587 22.6463L5.44118 23.3106C5.08435 23.4086 4.87313 23.778 4.97246 24.1316L5.64324 26.5242C5.74258 26.8778 6.11541 27.0865 6.47258 26.9882L8.8901 26.3242C9.24727 26.2262 9.45816 25.8568 9.35915 25.5033L8.68804 23.1106Z" fill="#565EF5"/>
          </svg>
          <span className="services__tab-text">Кредиты</span>
        </li>
        <li
          className={getActiveClass(TabType.INSURANCE, tab)}
          onClick={()=>{
            tabClickHandler(TabType.INSURANCE);
          }}
          onFocus={()=>{
            tabClickHandler(TabType.INSURANCE);
          }}
        >
          <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http:www.w3.org/2000/svg">
            <path d="M27.9234 5.31216C22.1552 5.31216 17.7362 3.65462 13.9995 0C10.2631 3.65462 5.84431 5.31216 0.0766133 5.31216C0.0766133 14.8295 -1.88138 28.4631 13.9994 34C29.8813 28.4632 27.9234 14.8296 27.9234 5.31216ZM12.8461 22.0601L8.2074 17.3939L10.2843 15.3051L12.8461 17.8823L17.7151 12.9849L19.7919 15.0737L12.8461 22.0601Z" fill="#565EF5"/>
          </svg>
          <span className="services__tab-text">Страхование</span>
        </li>
        <li
          className={getActiveClass(TabType.ONLINE, tab)}
          onClick={()=>{
            tabClickHandler(TabType.ONLINE);
          }}
          onFocus={()=>{
            tabClickHandler(TabType.ONLINE);
          }}
        >
          <svg width="20" height="34" viewBox="0 0 20 34" fill="none" xmlns="http:www.w3.org/2000/svg">
            <path d="M17.6746 0H2.3254C1.04663 0 0 1.03263 0 2.29646V31.7026C0 32.9664 1.04663 34 2.3254 34H17.6746C18.9534 34 20 32.9683 20 31.7035V2.29646C20 1.03263 18.9534 0 17.6746 0ZM7.54476 1.65531H12.4552C12.6107 1.65531 12.7366 1.77966 12.7366 1.93411C12.7366 2.0876 12.6107 2.21194 12.4552 2.21194H7.54476C7.38934 2.21194 7.26343 2.0876 7.26343 1.93411C7.26343 1.77966 7.38934 1.65531 7.54476 1.65531ZM10 32.8518C9.35766 32.8518 8.8373 32.3379 8.8373 31.7026C8.8373 31.0673 9.35766 30.5543 10 30.5543C10.6423 30.5543 11.1627 31.0673 11.1627 31.7026C11.1627 32.3379 10.6423 32.8518 10 32.8518ZM18.3819 29.75H1.61814V3.64189H18.3819V29.75Z" fill="#565EF5"/>
          </svg>
          <span className="services__tab-text">Онлайн-сервисы</span>
        </li>
      </ul>
      <div className="services__container">
        {element}
      </div>
      <div className="services__slider">
        <Swiper
          pagination={{
            clickable: true,
          }}
          spaceBetween={0}
          slidesPerView={1}
        >
          <SwiperSlide className="services__slide">
            <div className="services__info">
              <p className="services__info-text">Вклады Лига Банка – это выгодная<br className="services__text-shift"/> инвестиция в свое будущее</p>
              <ul className="services__info-list">
                <li className="services__info-item">
                  Проценты по вкладам до 7%
                </li>
                <li className="services__info-item">
                  Разнообразные условия
                </li>
                <li className="services__info-item">
                  Возможность ежемесячной капитализации<br className="services__text-shift"/> или вывод процентов на банковскую карту
                </li>
              </ul>
              <a className="services__info-btn" href="/">Узнать подробнее</a>
            </div>
            <div className="services__slide-picture services__slide-picture--mobile">
              <picture>
                <source srcSet="../../img/piggybank-mobile.jpg" media="(max-width: 767px)"/>
                <img src="../../img/piggybank-tablet.jpg" width="289" height="260" alt="Вклады"/>
              </picture>
            </div>
          </SwiperSlide>
          <SwiperSlide className="services__slide">
            <div className="services__info">
              <p className="services__info-text">Лига Банк выдает кредиты<br/> под любые цели</p>
              <ul className="services__info-list">
                <li className="services__info-item">
                  Ипотечный кредит
                </li>
                <li className="services__info-item">
                  Автокредит
                </li>
                <li className="services__info-item">
                  Потребительский кредит
                </li>
              </ul>
              <p className="services__text">Рассчитайте ежемесячный платеж<br/> и ставку по кредиту воспользовавшись<br/> нашим
                <a className="services__info-text-link" href="/">&nbsp;кредитным калькулятором</a>
              </p>
            </div>
            <div className="services__slide-picture services__slide-picture--car services__slide-picture--mobile">
              <picture>
                <source srcSet="../../img/car-mobile.jpg" media="(max-width: 767px)"/>
                <img src="../../img/car-tablet.jpg" width="289" height="260" alt="Вклады"/>
              </picture>
            </div>
          </SwiperSlide>
          <SwiperSlide className="services__slide">
            <div className="services__info">
              <p className="services__info-text">Лига Страхование — застрахуем<br/> все что захотите</p>
              <ul className="services__info-list">
                <li className="services__info-item">
                  Автомобильное страхование
                </li>
                <li className="services__info-item">
                  Страхование жизни и здоровья
                </li>
                <li className="services__info-item">
                  Страхование недвижимости
                </li>
              </ul>
              <a className="services__info-btn" href="/">Узнать подробнее</a>
            </div>
            <div className="services__slide-picture services__slide-picture--lock services__slide-picture--mobile">
              <picture>
                <source srcSet="../../img/lock-mobile.png" media="(max-width: 767px)"/>
                <img src="../../img/lock-tablet.png" width="289" height="260" alt="Вклады"/>
              </picture>
            </div>
          </SwiperSlide>
          <SwiperSlide className="services__slide">
            <div className="services__info">
              <p className="services__info-text">Лига Банк — это огромное количество онлайн-сервисов для вашего удобства</p>
              <ul className="services__info-list">
                <li className="services__info-item">
                  Мобильный банк,<br/>
                  который всегда под рукой
                </li>
                <li className="services__info-item">
                  Приложение Лига-проездной позволит<br/>
                  вам оплачивать билеты по всему миру
                </li>
              </ul>
              <a className="services__info-btn" href="/">Узнать подробнее</a>
            </div>
            <div className="services__slide-picture services__slide-picture--phone services__slide-picture--mobile">
              <picture>
                <source srcSet="../../img/phone-mobile.png" media="(max-width: 767px)"/>
                <img src="../../img/phone-tablet.png" width="289" height="260" alt="Вклады"/>
              </picture>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Services;
