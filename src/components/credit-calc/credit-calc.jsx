import React, {useState, useEffect} from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import CreditOffer from './credit-offer';

const options = [
  { value: 'mortgage', label: 'Ипотечное кредитование' },
  { value: 'avto', label: 'Автомобильное кредитование' },
];

const customStyles = {
  indicatorSeparator: () => null,
  menu: () => ({
    margin: 0,
    border: '1px solid #1F1E25',
    borderRadius: '0 0 4px 4px',
    borderTop: 'none',
    position: 'absolute',
    left: '0',
    right: '0',
    zIndex: '100',
    backgroundColor: 'white',
  }),
  valueContainer:(base, state) => (
    {
      ...base,
      color: '#1F1E25',
      padding: '17px 15px 18px 15px',
      fontSize: '16px',
      fontWeight: '500',
    }
  ),
  placeholder: (base, state) => (
    {
      ...base,
      color: '#1F1E25',
      fontSize: '16px',
      fontWeight: '500',
      outline: state.isFocused ? '1px solid rad' : 'none',
    }
  ),
  option: (base, state) => ({
    borderBottom: state.value === 'mortgage' ? '1px solid #C1C2CA' : 'none',
    padding: '17px 15px 18px 23px',
    fontSize: '16px',
    margin: '0',
    cursor: 'pointer',
    color: state.isFocused ? '#2C36F2' : '',
  }),
  control: (base, state) => ({
    border: '1px solid #1F1E25',
    borderRadius: state.menuIsOpen ? '4px 4px 0 0' : '4px',
    boxShadow: 'none',
    color: 'tomato',
    display: 'flex',
    flexDirection: 'row',
    borderColor: state.isFocused ? '#2C36F2' : '#1F1E25',
  }),
};
const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, min, ...restProps } = props;

  let overlay = `${value} %`;
  if (min === 5 || min === 1) {
    overlay = `${value} лет`;
  }

  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={overlay}
      visible
      placement="bottom"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const MAX_PRICE = 25000000;
const MAX_PRICE_AUTO = 5000000;
const MIN_PRICE = 1200000;
const MIN_PRICE_AUTO = 500000;
const MIN_YEARS = 5;
const MIN_YEARS_AUTO = 1;
const MAX_YEARS = 30;
const MAX_YEARS_AUTO = 5;
const PERCENT = 100;
const MIN_FEE = 10;
const MIN_FEE_AUTO = 20;

function CreditCalc() {
  const [creditGoal, setCreditGoal] = useState(false);

  const isMortgageCalc = creditGoal === 'mortgage';

  const initialState = {
    price: isMortgageCalc ? MIN_PRICE : MIN_PRICE_AUTO,
    initialFee: 0,
    initialFeePercent: isMortgageCalc ? MIN_FEE : MIN_FEE_AUTO,
    years: isMortgageCalc ? MIN_YEARS : MIN_YEARS_AUTO,
    motherCapital: false,
    insurance: false,
    lifeInsurance: false,
  };

  const [menuState, setMenuState] = useState(false);
  const [application, setApplication] = useState(false);
  const [calcNumbers, setCalcNumbers] = useState(initialState);

  const invalidNumber = calcNumbers.price <
    (isMortgageCalc ? MIN_PRICE : MIN_PRICE_AUTO) ||
    calcNumbers.price > (isMortgageCalc ? MAX_PRICE : MAX_PRICE_AUTO);

  const selectChangeHandler = (data) => {
    setCreditGoal(data.value);
  };

  const minusBtnHandler = () => {
    if (calcNumbers.price >= (isMortgageCalc ? MIN_PRICE : MIN_PRICE_AUTO)) {
      setCalcNumbers((prevState) => {
        const price = prevState.price - 100000;
        const initialFee = price * (prevState.initialFeePercent / PERCENT);
        return {
          ...prevState,
          price,
          initialFee,
        };
      });
    }
  };

  const plusBtnHandler = () => {
    if (calcNumbers.price <= (isMortgageCalc ? MAX_PRICE : MAX_PRICE_AUTO)) {
      setCalcNumbers((prevState) => {
        const price = prevState.price + 100000;
        const initialFee = price * (prevState.initialFeePercent / PERCENT);
        return {
          ...prevState,
          price,
          initialFee,
        };
      });
    }
  };

  const numberInputHandle = ({floatValue}) => {
    setCalcNumbers((prevState) => {
      const initialFee = floatValue * (prevState.initialFeePercent / PERCENT);
      return {
        ...prevState,
        price: floatValue,
        initialFee,
      };
    });
  };
  const feeNumberInputHandler = ({floatValue}) => {
    setCalcNumbers((prevState) => {
      const initialFee = floatValue;
      const initialFeePercent = Math.floor((initialFee / prevState.price) * PERCENT);
      return {
        ...prevState,
        initialFee,
        initialFeePercent,
      };
    });
  };

  const feeSliderChangeHandler = (data) => {
    setCalcNumbers((prevState) => {
      const initialFee = Math.floor(prevState.price * (data / PERCENT));
      return {
        ...prevState,
        initialFee,
        initialFeePercent: data,
      };
    });
  };

  const yearsSliderChangeHandler = (data) => {
    setCalcNumbers((prevState) => ({
      ...prevState,
      years: data,
    }));
  };

  const yearsInputChangeHandler = ({floatValue}) => {
    setCalcNumbers((prevState) =>
      ({
        ...prevState,
        years: floatValue,
      }),
    );
  };

  const checkboxChangeHandler = ({target}) => {
    setCalcNumbers((prevState) => ({
      ...prevState,
      [target.name]: target.checked,
    }));
  };
  const sliderStep = calcNumbers.initialFeePercent % 5 === 0 ? 5 : 1;

  useEffect(() => {
    setCalcNumbers( {
      ...calcNumbers,
      initialFee: Math.floor(calcNumbers.price * (calcNumbers.initialFeePercent / PERCENT)),
    });
  }, []);

  useEffect(() => {
    setCalcNumbers(initialState);
  }, [creditGoal]);

  return (
    <section className="credit-calc">
      <h3 className="credit-calc__main-title">Кредитный калькулятор</h3>
      <div className="credit-calc__step-one">
        <h4 className="credit-calc__step-title">Шаг 1. Цель кредита</h4>
        <label className="visually-hidden" htmlFor="creditType">цель кредита</label>
        <div className={`credit-calc__select-container ${menuState && 'credit-calc__select-container--open'}`}>
          <Select
            styles={customStyles}
            placeholder="Выберите цель кредита"
            options={options}
            isSearchable={false}
            className="test"
            onMenuOpen={() => {setMenuState(true);}}
            onMenuClose={() => {setMenuState(false);}}
            onChange={selectChangeHandler}
            openMenuOnFocus
          />
        </div>
      </div>
      {creditGoal &&
        <>
          <div className="credit-calc__step-two">
            <h4 className="credit-calc__step-title">Шаг 2. Введите параметры кредита</h4>
            <div className="credit-calc__step-container">
              <label className="credit-calc__label" htmlFor="price">
                Стоимость {isMortgageCalc ? 'недвижимости' : 'автомобиля'}
              </label>
              <div className="credit-calc__input-container">
                <button
                  className="credit-calc__btn credit-calc__btn--decrease"
                  area-label="Уменьшить"
                  onClick={minusBtnHandler}
                >
                  <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="1" x2="16" y2="1" stroke="#1F1E25" strokeWidth="2"/>
                  </svg>
                </button>
                <NumberFormat
                  className={`credit-calc__input ${invalidNumber && 'credit-calc__input--error'}`}
                  thousandSeparator={' '}
                  suffix={' рублей'}
                  id="price"
                  name="price"
                  value={calcNumbers.price}
                  onValueChange={numberInputHandle}
                />
                {invalidNumber && <span className="credit-calc__error-message">Некорректное значение</span>}
                <button
                  className="credit-calc__btn credit-calc__btn--increase"
                  area-label="Увеличить"
                  onClick={plusBtnHandler}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8H16M8 0V16" stroke="#1F1E25" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              <p className="credit-calc__warning-info">
                {creditGoal === 'mortgage' ? 'От 1 200 000  до 25 000 000 рублей' : 'От 500 000 до 5 000 000 рублей'}
              </p>
            </div>
            <div className="credit-calc__step-container">
              <label className="credit-calc__label" htmlFor="initialFee">Первоначальный взнос</label>
              <div className="credit-calc__input-container">
                <NumberFormat
                  className="credit-calc__input"
                  thousandSeparator={' '}
                  suffix={' рублей'}
                  id="initialFee"
                  name="initialFee"
                  onValueChange={feeNumberInputHandler}
                  value={calcNumbers.initialFee}
                />
              </div>
              <div className="credit-calc__scrollbar-container">
                <Slider
                  min={isMortgageCalc ? MIN_FEE : MIN_FEE_AUTO}
                  max={100}
                  handle={handle}
                  step={sliderStep}
                  railStyle={{ backgroundColor: '#C1C2CA', height: 1 }}
                  trackStyle={{ backgroundColor: '#2C36F2', height: 1 }}
                  handleStyle={{
                    border: 'none',
                    height: 14,
                    width: 14,
                    backgroundColor: '#2C36F2',
                    boxShadow: 'none',
                  }}
                  value={calcNumbers.initialFeePercent}
                  onChange={feeSliderChangeHandler}
                />
              </div>
            </div>
            <div className="credit-calc__step-container credit-calc__step-container--time">
              <label className="credit-calc__label" htmlFor="loanTerms">Срок кредитования</label>
              <div className="credit-calc__input-container">
                <NumberFormat
                  className="credit-calc__input"
                  thousandSeparator={' '}
                  suffix={' лет'}
                  id="loanTerms"
                  name="loanTerms"
                  onValueChange={yearsInputChangeHandler}
                  value={calcNumbers.years}
                />
              </div>
              <div className="credit-calc__scrollbar-container credit-calc__scrollbar-container--time">
                <Slider
                  min={isMortgageCalc ? MIN_YEARS : MIN_YEARS_AUTO}
                  max={isMortgageCalc ? MAX_YEARS : MAX_YEARS_AUTO}
                  handle={handle}
                  step={1}
                  railStyle={{ backgroundColor: '#C1C2CA', height: 1 }}
                  trackStyle={{ backgroundColor: '#2C36F2', height: 1 }}
                  handleStyle={{
                    border: 'none',
                    height: 14,
                    width: 14,
                    backgroundColor: '#2C36F2',
                    boxShadow: 'none',
                  }}
                  value={calcNumbers.years}
                  onChange={yearsSliderChangeHandler}
                />
              </div>
            </div>
            <div className="credit-calc__step-container">
              <ul className="credit-calc__check-list">
                {isMortgageCalc ?
                  <li className="credit-calc__check-item">
                    <input
                      className="visually-hidden credit-calc__checkbox-input"
                      type="checkbox"
                      id="motherCapital"
                      name="motherCapital"
                      onChange={checkboxChangeHandler}
                    />
                    <label className="credit-calc__checkbox-label" htmlFor="motherCapital">Использовать материнский капитал</label>
                  </li> :
                  <>
                    <li className="credit-calc__check-item">
                      <input
                        className="visually-hidden credit-calc__checkbox-input"
                        type="checkbox"
                        id="insurance"
                        name="insurance"
                        onChange={checkboxChangeHandler}
                      />
                      <label className="credit-calc__checkbox-label" htmlFor="insurance">Оформить КАСКО в нашем банке</label>
                    </li>
                    <li className="credit-calc__check-item">
                      <input
                        className="visually-hidden credit-calc__checkbox-input"
                        type="checkbox"
                        id="lifeInsurance"
                        name="lifeInsurance"
                        onChange={checkboxChangeHandler}
                      />
                      <label className="credit-calc__checkbox-label" htmlFor="lifeInsurance">Оформить Страхование жизни в нашем банке</label>
                    </li>
                  </>}
              </ul>
            </div>
          </div>
          <CreditOffer data={calcNumbers} isMortgageCalc={isMortgageCalc}/>
        </>}
      {application &&
      <div className="credit-calc__application">
        <div className="credit-calc__application-container">
          <h4 className="credit-calc__step-title credit-calc__step-title--offer">Шаг 3. Оформление заявки</h4>
          <ul className="credit-calc__application-list">
            <li className="credit-calc__application-item">
              <p className="credit-calc__application-name">Номер заявки</p>
              <p className="credit-calc__application-result">№ 0010</p>
            </li>
            <li className="credit-calc__application-item">
              <p className="credit-calc__application-name">Цель кредита</p>
              <p className="credit-calc__application-result">Ипотека</p>
            </li>
            <li className="credit-calc__application-item">
              <p className="credit-calc__application-name">Стоимость недвижимости</p>
              <p className="credit-calc__application-result">2 000 000 рублей</p>
            </li>
            <li className="credit-calc__application-item">
              <p className="credit-calc__application-name">Первоначальный взнос</p>
              <p className="credit-calc__application-result">200 000 рублей</p>
            </li>
            <li className="credit-calc__application-item">
              <p className="credit-calc__application-name">Срок кредитования</p>
              <p className="credit-calc__application-result">5 лет</p>
            </li>
          </ul>
          <form className="credit-calc__application-form" action="/" method="post">
            <ul className="credit-calc__application-form-list">
              <li className="credit-calc__application-form-item credit-calc__application-form-item--full-width">
                <label className="visually-hidden" htmlFor="userName">Фамилия Имя Отчество</label>
                <input
                  className="credit-calc__application-input"
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="ФИО"
                />
              </li>
              <li className="credit-calc__application-form-item">
                <label className="visually-hidden" htmlFor="userPhone">Номер телефона</label>
                <NumberFormat
                  className="credit-calc__application-input"
                  id="userPhone"
                  name="userPhone"
                  format={'+7-(###)-##-##'}
                  placeholder="Телефон"
                />
              </li>
              <li className="credit-calc__application-form-item">
                <label className="visually-hidden" htmlFor="email">Email</label>
                <input
                  className="credit-calc__application-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                />
              </li>
            </ul>
            <button className="credit-calc__application-btn">Отправить</button>
          </form>
        </div>
      </div>}

    </section>
  );
}

export default CreditCalc;
