import React from 'react';

function PromoBlock() {
  return (
    <section className="app__section promo-block">
      <div className="promo-block__wrapper">
        <h2 className="app__title promo-block__title">
          <span className="promo-block__big-text">Лига Банк</span><br/>
          Кредиты на любой случай
        </h2>
        <a className="app__link promo-block__link" href="#">Рассчитать кредит</a>
        <img className="promo-block__pic" src="../../img/promo-cards.png" width="444" height="286" alt="Credit promo, two cards"/>
      </div>
    </section>
  );
}

export default PromoBlock;
