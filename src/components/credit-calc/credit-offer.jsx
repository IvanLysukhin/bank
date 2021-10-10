import React, {useMemo} from 'react';
import {bool, number, shape} from 'prop-types';

const MONTH_COUNT = 12;
const MOTHER_CAPITAL = 470000;
const REQUIRED_INCOME_PERCENT = 0.45;
const PRICE_LIMIT_TEN = 10000000;
const PRICE_LIMIT_ONE = 1000000;
const MIN_CREDIT_SUM = 500000;
const MIN_CREDIT_SUM_AUTO = 200000;

function CreditOffer ({data, isMortgageCalc}) {
  const {
    price,
    initialFee,
    initialFeePercent,
    years,
    motherCapital,
    insurance,
    lifeInsurance,
  } = data;

  const formatNumber = (num) => new Intl.NumberFormat('ru-RU').format(num);

  let loanRate = initialFeePercent < 15 ? 0.094 : 0.085;

  if (!isMortgageCalc) {
    loanRate = 0.16;
    if (price > 2000000) {
      loanRate = 0.15;
    }
    if (insurance || lifeInsurance) {
      loanRate = 0.085;
    }

    if (insurance && lifeInsurance) {
      loanRate = 0.035;
    }
  }


  const monthlyLoanRate = loanRate / MONTH_COUNT;
  const creditSum = price - initialFee - (motherCapital && MOTHER_CAPITAL);
  const periodInMonths = years * MONTH_COUNT;
  const monthlyPayment = Math.round(creditSum * (monthlyLoanRate + (monthlyLoanRate / (Math.pow((1 + monthlyLoanRate), (periodInMonths)) - 1))));
  const requiredIncome = Math.round(monthlyPayment / REQUIRED_INCOME_PERCENT);

  const formatPercent = useMemo(() => `${[...(loanRate * 100).toString()].splice(0, 3).join('')}%`.replace((/\./), (',')), [loanRate]);


  return (
    <div className="credit-calc__offer">
      <div className="credit-calc__offer-container">
        {creditSum > (isMortgageCalc ? MIN_CREDIT_SUM : MIN_CREDIT_SUM_AUTO) ?
          <>
            <h4 className="credit-calc__step-title credit-calc__step-title--offer">Наше предложение</h4>
            <ul className="credit-calc__offer-list">
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{formatNumber(price)} {price <= PRICE_LIMIT_TEN ? 'рублей' : '₽'} </p>
                <p className="credit-calc__offer-label">Сумма ипотеки</p>
              </li>
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{formatPercent}</p>
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
            <h4 className="credit-calc__step-title credit-calc__step-title--offer">
              Наш банк не выдаёт {isMortgageCalc ? 'ипотечные' : 'автомобильные'}<br/> кредиты меньше {isMortgageCalc ? '500 000' : '200 000'} рублей.
            </h4>
            <p className="credit-calc__offer-label credit-calc__offer-label--error">Попробуйте использовать другие<br/> параметры для расчёта.</p>
          </>}
      </div>
    </div>
  );
}

CreditOffer.propTypes = {
  data: shape({
    price: number.isRequired,
    initialFee: number.isRequired,
    initialFeePercent: number.isRequired,
    years: number.isRequired,
    motherCapital: bool.isRequired,
    insurance: bool.isRequired,
    lifeInsurance: bool.isRequired,
  }).isRequired,
  isMortgageCalc: bool.isRequired,
};

export default CreditOffer;
