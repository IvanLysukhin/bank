import React, {useState} from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select';
import NumberFormat from 'react-number-format';

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
  if (min === 5) {
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

function CreditCalc() {
  const [menuState, setMenuState] = useState(false);
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
            openMenuOnFocus
          />
        </div>
      </div>
      <div className="credit-calc__step-two">
        <h4 className="credit-calc__step-title">Шаг 2. Введите параметры кредита</h4>
        <div className="credit-calc__step-container">
          <label className="credit-calc__label" htmlFor="price">Стоимость недвижимости</label>
          <div className="credit-calc__input-container">
            <button className="credit-calc__btn credit-calc__btn--decrease" area-label="Уменьшить">
              <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="1" x2="16" y2="1" stroke="#1F1E25" strokeWidth="2"/>
              </svg>
            </button>
            <NumberFormat
              className="credit-calc__input"
              thousandSeparator={' '}
              suffix={' рублей'}
              id="price"
              name="price"
            />
            <button className="credit-calc__btn credit-calc__btn--increase" area-label="Увеличить">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8H16M8 0V16" stroke="#1F1E25" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          <p className="credit-calc__warning-info">От 1 200 000  до 25 000 000 рублей</p>
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
            />
          </div>
          <div className="credit-calc__scrollbar-container">
            <Slider
              min={10}
              max={100}
              handle={handle}
              step={5}
              railStyle={{ backgroundColor: '#C1C2CA', height: 1 }}
              trackStyle={{ backgroundColor: '#2C36F2', height: 1 }}
              handleStyle={{
                border: 'none',
                height: 14,
                width: 14,
                backgroundColor: '#2C36F2',
                boxShadow: 'none',
              }}
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
            />
          </div>
          <div className="credit-calc__scrollbar-container credit-calc__scrollbar-container--time">
            <Slider
              min={5}
              max={30}
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
              mode={'time'}
            />
          </div>
        </div>
        <div className="credit-calc__step-container">
          <input className="visually-hidden credit-calc__checkbox-input" type="checkbox" id="mother" name="mother"/>
          <label className="credit-calc__checkbox-label" htmlFor="mother">Использовать материнский капитал</label>
        </div>
      </div>
      <div className="credit-calc__offer">
        <div className="credit-calc__offer-container">
          <h4 className="credit-calc__step-title credit-calc__step-title--offer">Наше предложение</h4>
          <ul className="credit-calc__offer-list">
            <li className="credit-calc__offer-item">
              <p className="credit-calc__offer-value">1 330 000 рублей </p>
              <p className="credit-calc__offer-label">Сумма ипотеки</p>
            </li>
            <li className="credit-calc__offer-item">
              <p className="credit-calc__offer-value">9,40%</p>
              <p className="credit-calc__offer-label">Процентная ставка</p>
            </li>
            <li className="credit-calc__offer-item">
              <p className="credit-calc__offer-value">27 868 рублей</p>
              <p className="credit-calc__offer-label">Ежемесячный платеж</p>
            </li>
            <li className="credit-calc__offer-item">
              <p className="credit-calc__offer-value">61 929 рублей</p>
              <p className="credit-calc__offer-label">Необходимый доход</p>
            </li>
          </ul>
          <button className="credit-calc__offer-btn">Оформить заявку</button>
        </div>
      </div>
      <div className="credit-calc__application">
        <div className="credit-calc__application-container">
          <h4 className="credit-calc__step-title">Шаг 3. Оформление заявки</h4>
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
                  prefix={'+7 '}
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
      </div>
    </section>
  );
}

export default CreditCalc;
