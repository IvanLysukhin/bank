import React, {useState, useEffect, useCallback} from 'react';
import NumberFormat from 'react-number-format';
import {formatNumberToStr, saveData} from '../../utils';
import {string, number, shape, func} from 'prop-types';

const initialState = {
  userPhone: '',
  name: '',
  email: '',
};

function Application ({results, type, sendApplicationHandler}) {

  const creditName = type === 'mortgage' ? 'Ипотека' : 'Автокредит';
  const priceLabel = type === 'mortgage' ? 'Стоимость недвижимости ' : 'Стоимость автомобиля';

  const {price,initialFee,years} = results;

  const [userData, setUserData] = useState(initialState);
  const [saveStatus, setSaveStatus] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState(0);

  const nameInputHandler = ({target}) => {
    setUserData({
      ...userData,
      [target.name]: target.value,
    });
  };

  const formatedAplicationNumber = useCallback(() => {
    if (applicationNumber < 10) {
      return `000${applicationNumber}`;
    }
    if (applicationNumber >= 10 && applicationNumber < 100) {
      return `00${applicationNumber}`;
    }
    if (applicationNumber >= 100 && applicationNumber < 1000) {
      return `0${applicationNumber}`;
    }
    if (applicationNumber >= 1000) {
      return `${applicationNumber}`;
    }
  }, [applicationNumber]);


  const submitFormHandler = (evt) => {
    evt.preventDefault();
    const data = Object.values(userData);
    const isSomeDataEmpty = data.some((info) => info.length === 0);
    const isCorrectNumber = userData.userPhone.replace(/[-+()/\\]/g,'').trim().length === 11;

    if (!isSomeDataEmpty && isCorrectNumber && !saveStatus) {
      saveData(userData);
      sendApplicationHandler(true);
      setSaveStatus(true);
      setApplicationNumber((prevState) => prevState += 1);
    }
  };

  useEffect(() =>{
    setUserData(initialState);
    return () => {
      setSaveStatus(false);
    };
  }, [saveStatus]);

  useEffect(() => {
    const applicationCount = JSON.parse(localStorage.getItem('users'));
    if (applicationCount) {
      setApplicationNumber(applicationCount.length + 1);
    }
  }, [applicationNumber]);

  return (
    <div className="credit-calc__application">
      <div className="credit-calc__application-container">
        <h4 className="credit-calc__step-title credit-calc__step-title--application">Шаг 3. Оформление заявки</h4>
        <ul className="credit-calc__application-list">
          <li className="credit-calc__application-item">
            <p className="credit-calc__application-name">Номер заявки</p>
            <p className="credit-calc__application-result">№ {formatedAplicationNumber()}</p>
          </li>
          <li className="credit-calc__application-item">
            <p className="credit-calc__application-name">Цель кредита</p>
            <p className="credit-calc__application-result">{creditName}</p>
          </li>
          <li className="credit-calc__application-item">
            <p className="credit-calc__application-name">{priceLabel}</p>
            <p className="credit-calc__application-result">{formatNumberToStr(price)} рублей</p>
          </li>
          <li className="credit-calc__application-item">
            <p className="credit-calc__application-name">Первоначальный взнос</p>
            <p className="credit-calc__application-result">{formatNumberToStr(initialFee)} рублей</p>
          </li>
          <li className="credit-calc__application-item">
            <p className="credit-calc__application-name">Срок кредитования</p>
            <p className="credit-calc__application-result">{formatNumberToStr(years)} лет</p>
          </li>
        </ul>
        <form
          className="credit-calc__application-form"
          action="/"
          method="post"
          onSubmit={submitFormHandler}
        >
          <ul className="credit-calc__application-form-list">
            <li className="credit-calc__application-form-item credit-calc__application-form-item--full-width">
              <label className="visually-hidden" htmlFor="userName">Фамилия Имя Отчество</label>
              <input
                className="credit-calc__application-input"
                type="text"
                id="name"
                name="name"
                placeholder="ФИО"
                onChange={nameInputHandler}
                value={userData.name}
              />
            </li>
            <li className="credit-calc__application-form-item">
              <label className="visually-hidden" htmlFor="userPhone">Номер телефона</label>
              <NumberFormat
                className="credit-calc__application-input"
                id="userPhone"
                name="userPhone"
                format={'+7-(###)-###-##-##'}
                placeholder="Телефон"
                onChange={nameInputHandler}
                value={userData.userPhone}
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
                onChange={nameInputHandler}
                value={userData.email}
              />
            </li>
          </ul>
          <button className="credit-calc__application-btn">Отправить</button>
        </form>
      </div>
    </div>
  );
}

Application.propTypes = {
  results: shape({
    price: number.isRequired,
    initialFee: number.isRequired,
    years: number.isRequired,
  }).isRequired,
  type: string.isRequired,
  sendApplicationHandler: func.isRequired,
};

export default Application;
