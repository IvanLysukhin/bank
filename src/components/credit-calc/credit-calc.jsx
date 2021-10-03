import React, {useState} from 'react';
import Select from 'react-select';

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
      </div>
      <div className="credit-calc__offer">
        <h4 className="credit-calc__step-title">Наше предложение</h4>
      </div>
      <div className="credit-calc__application">
        <h4 className="credit-calc__step-title">Шаг 3. Оформление заявки</h4>
      </div>
    </section>
  );
}

export default CreditCalc;
