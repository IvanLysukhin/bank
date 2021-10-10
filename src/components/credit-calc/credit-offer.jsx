import React from 'react';
import {bool, number, shape} from 'prop-types';

const MONTH_COUNT = 12;
const MOTHER_CAPITAL = 470000;
const REQUIRED_INCOME_PERCENT = 0.45;
const PRICE_LIMIT_TEN = 10000000;
const PRICE_LIMIT_ONE = 1000000;
const MIN_CREDIT_SUM = 500000;

function CreditOffer ({data}) {
  const {
    price,
    initialFee,
    initialFeePercent,
    years,
    motherCapital,
  } = data;

  const formatNumber = (num) => new Intl.NumberFormat('ru-RU').format(num);

  const loanRate = initialFeePercent < 15 ? 0.094 : 0.085;

  const monthlyLoanRate = loanRate / MONTH_COUNT;
  const creditSum = price - initialFee - (motherCapital && MOTHER_CAPITAL);
  const periodInMonths = years * MONTH_COUNT;
  const monthlyPayment = Math.round(creditSum * (monthlyLoanRate + (monthlyLoanRate / (Math.pow((1 + monthlyLoanRate), (periodInMonths)) - 1))));
  const requiredIncome = Math.round(monthlyPayment / REQUIRED_INCOME_PERCENT);


  return (
    <div className="credit-calc__offer">
      <div className="credit-calc__offer-container">
        {creditSum > MIN_CREDIT_SUM ?
          <>
            <h4 className="credit-calc__step-title credit-calc__step-title--offer">Наше предложение</h4>
            <ul className="credit-calc__offer-list">
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{formatNumber(price)} {price <= PRICE_LIMIT_TEN ? 'рублей' : '₽'} </p>
                <p className="credit-calc__offer-label">Сумма ипотеки</p>
              </li>
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{initialFeePercent < 15 ? '9,40%' : '8,50%'}</p>
                <p className="credit-calc__offer-label">Процентная ставка</p>
              </li>
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{formatNumber(monthlyPayment)} {monthlyPayment <= PRICE_LIMIT_ONE ? 'рублей' : '₽'}</p>
                <p className="credit-calc__offer-label">Ежемесячный платеж</p>
              </li>
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{formatNumber(requiredIncome)} {requiredIncome <= PRICE_LIMIT_ONE ? 'рублей' : '₽'}</p>
                <p className="credit-calc__offer-label">Необходимый доход</p>
              </li>
            </ul>
            <button className="credit-calc__offer-btn">Оформить заявку</button>
          </> :
          <>
            <h4 className="credit-calc__step-title credit-calc__step-title--offer">Наш банк не выдаёт ипотечные<br/> кредиты меньше 500 000 рублей.</h4>
            <p className="credit-calc__offer-label credit-calc__offer-label--error">Попробуйте использовать другие<br/> параметры для расчёта.</p>
          </>}
      </div>
    </div>
  );
}

CreditOffer.propTypes = {
  data: shape({
    price: number,
    initialFee: number,
    initialFeePercent: number,
    years: number,
    motherCapital: bool,
  }),
};

export default CreditOffer;
