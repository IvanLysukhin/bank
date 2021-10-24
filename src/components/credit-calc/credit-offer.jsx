import React, {useMemo} from 'react';
import {bool, number, func, shape} from 'prop-types';
import {formatNumberToStr} from '../../utils';
import {
  MONTH_COUNT,
  MOTHER_CAPITAL,
  REQUIRED_INCOME_PERCENT,
  PRICE_LIMIT_TEN,
  PRICE_LIMIT_ONE,
  MIN_CREDIT_SUM,
  MIN_CREDIT_SUM_AUTO,
  MAX_PRICE,
  MAX_PRICE_AUTO,
  MIN_PRICE,
  MIN_PRICE_AUTO
} from '../../constants';


function CreditOffer ({data, isMortgageCalc, btnHandler}) {
  const {
    price,
    initialFee,
    initialFeePercent,
    years,
    motherCapital,
    insurance,
    lifeInsurance,
  } = data;

  const isPriceInvalid = price > (isMortgageCalc ? MAX_PRICE : MAX_PRICE_AUTO) || price < (isMortgageCalc ? MIN_PRICE : MIN_PRICE_AUTO);

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
        {creditSum > (isMortgageCalc ? MIN_CREDIT_SUM : MIN_CREDIT_SUM_AUTO) && !isPriceInvalid ?
          <>
            <h4 className="credit-calc__step-title credit-calc__step-title--offer">Наше предложение</h4>
            <ul className="credit-calc__offer-list">
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{formatNumberToStr(price)} {price <= PRICE_LIMIT_TEN ? 'рублей' : '₽'} </p>
                <p className="credit-calc__offer-label">Сумма {isMortgageCalc ? 'ипотеки' : 'автокредита'}</p>
              </li>
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{formatPercent}</p>
                <p className="credit-calc__offer-label">Процентная ставка</p>
              </li>
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{formatNumberToStr(monthlyPayment)} {monthlyPayment <= PRICE_LIMIT_ONE ? 'рублей' : '₽'}</p>
                <p className="credit-calc__offer-label">Ежемесячный платеж</p>
              </li>
              <li className="credit-calc__offer-item">
                <p className="credit-calc__offer-value">{formatNumberToStr(requiredIncome)} {requiredIncome <= PRICE_LIMIT_ONE ? 'рублей' : '₽'}</p>
                <p className="credit-calc__offer-label">Необходимый доход</p>
              </li>
            </ul>
            <button
              className="credit-calc__offer-btn"
              onClick={() => {btnHandler();}}
            >
              Оформить заявку
            </button>
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
  btnHandler: func.isRequired,
};

export default CreditOffer;
