import React from 'react';
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
  }),
  placeholder: (base, state) => ({...base, color: 'tomato'}),
  control: (base, state) => {
    console.log(state);
    return {
      ...base,
      color: 'tomato',
      display: 'flex',
      flexDirection: 'row',
    };},
};

function CreditCalc() {
  return (
    <section className="credit-calc">
      <h3 className="credit-calc__main-title">Кредитный калькулятор</h3>
      <div className="credit-calc__step-one">
        <h4 className="credit-calc__step-title">Шаг 1. Цель кредита</h4>
        <label className="visually-hidden" htmlFor="creditType">цель кредита</label>
        <Select
          styles={customStyles}
          placeholder="Выберите цель кредита"
          options={options}
        />
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
