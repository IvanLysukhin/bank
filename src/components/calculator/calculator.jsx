import React, {useRef, useState, useEffect} from 'react';
import {Currency, DATE_RANGE} from '../../constants';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {loadData, saveResult} from '../../store/actions';
import {fetchCurrencyRates, fetchCurrencyRatesEnd} from '../../axios/api-actions';
import {getEndRate, getLoadStatus, getStartRate} from '../../store/selectors';

function Calculator() {
  const [state, setState] = useState({
    id: 0,
    have: '',
    want: '',
    haveCurrency: Currency.RUB,
    wantCurrency: Currency.USD,
    date: new Date().toLocaleDateString(),
  });

  const haveInput = useRef();
  const wantInput = useRef();
  const timeInput = useRef();

  const startRate = useSelector(getStartRate);
  const endRate = useSelector(getEndRate);
  const loadStatus = useSelector(getLoadStatus);
  const dispatch = useDispatch();

  let calendar;

  const onSaveButtonClickHandler = (evt) => {
    evt.preventDefault();

    if (state.have <= 0 || state.want <= 0) {
      return;
    }

    dispatch(saveResult({
      id: state.id + 1,
      date: state.date,
      startNumber: state.have.toString(),
      endNumber: state.want.toString(),
      startCurrency: state.haveCurrency,
      endCurrency: state.wantCurrency,
    }));

    setState({
      ...state,
      id: state.id + 1,
    });
  };

  const onHaveCurrencyChangeHandler = ({target}) => {
    setState({
      ...state,
      have: '',
      want: '',
      haveCurrency: target.value,
    });

    dispatch(loadData(false));
  };

  const onWantCurrencyChangeHandler = ({target}) => {
    setState({
      ...state,
      wantCurrency: target.value,
    });

    dispatch(loadData(false));
  };

  const onHaveInputHandler = ({target}) => {
    setState({
      ...state,
      have: target.value,
      want: target.value * startRate,
    });
  };

  const onWantInputHandler = ({target}) => {
    setState({
      ...state,
      have: target.value * endRate,
      want: target.value,
    });
  };

  const onTimeInputClick = () => {
    calendar.open();
  };

  useEffect(() => {
    dispatch(fetchCurrencyRatesEnd(state.requestDate, state.haveCurrency, state.wantCurrency));
    dispatch(fetchCurrencyRates(state.requestDate, state.haveCurrency, state.wantCurrency));
  }, [state.haveCurrency, state.wantCurrency, state.requestDate]);

  useEffect(() => {
    setState({
      ...state,
      want: state.have * startRate,
    });
  }, [startRate]);

  useEffect(() => {
    calendar = flatpickr(timeInput.current, {
      dateFormat: 'd.m.Y',
      ariaDateFormat: 'Y-m-d',
      maxDate: new Date(),
      minDate: dayjs(new Date()).add(-DATE_RANGE, 'day').format('DD.MM.YYYY'),
      onChange: (selectedDates) => {

        let calendarDates = dayjs(selectedDates).format('YYYY-MM-DD');
        const todayDate = dayjs(new Date()).format('YYYY-MM-DD');

        if (calendarDates === todayDate) {
          calendarDates = 'latest';
        }

        setState({
          ...state,
          date: timeInput.current.value,
          requestDate: calendarDates,
        });
      },
    });
  });

  return (
    <section className="app__section calculator">
      <div className="calculator__wrapper">
        <h2 className="app__title calculator__title">Конвертер валют</h2>
        <form className="calculator__form" action="#">
          <ul className="app__list calculator__list">
            <li className="calculator__item">
              <label className="calculator__label" htmlFor="haveNumber">У меня есть</label>
              <input
                className="calculator__input"
                type="number"
                id="haveNumber"
                name="haveNumber"
                value={state.have}
                ref={haveInput}
                onChange={onHaveInputHandler}
              />
              <label className="visually-hidden" htmlFor="currency">currency</label>
              <select
                className="calculator__input calculator__input--currency"
                name="currency"
                id="currency"
                value={state.haveCurrency}
                onChange={onHaveCurrencyChangeHandler}
              >
                <option value={Currency.RUB}>{Currency.RUB}</option>
                <option value={Currency.USD}>{Currency.USD}</option>
                <option value={Currency.EUR}>{Currency.EUR}</option>
                <option value={Currency.GBP}>{Currency.GBP}</option>
                <option value={Currency.CNY}>{Currency.CNY}</option>
              </select>
            </li>
            <li className="calculator__item">
              <label className="calculator__label" htmlFor="wantNumber">Хочу приобрести</label>
              <input
                className="calculator__input"
                type="number"
                id="wantNumber"
                name="wantNumber"
                value={state.want}
                ref={wantInput}
                onChange={onWantInputHandler}
              />
              <label className="visually-hidden" htmlFor="currency">currency</label>
              <select
                className="calculator__input calculator__input--currency"
                name="currency"
                id="currency"
                value={state.wantCurrency}
                onChange={onWantCurrencyChangeHandler}
              >
                <option value={Currency.RUB}>{Currency.RUB}</option>
                <option value={Currency.USD}>{Currency.USD}</option>
                <option value={Currency.EUR}>{Currency.EUR}</option>
                <option value={Currency.GBP}>{Currency.GBP}</option>
                <option value={Currency.CNY}>{Currency.CNY}</option>
              </select>
            </li>
          </ul>
          <div className="calculator__submit-box">
            <div className="calculator__calendar">
              <label className="visually-hidden" htmlFor="time">Выберите дату</label>
              <input
                className="calculator__input calculator__input--calendar"
                type="text"
                id="time"
                name="time"
                readOnly
                defaultValue={state.date}
                ref={timeInput}
                onClick={onTimeInputClick}
              />
            </div>
            <button
              className="calculator__save-btn"
              disabled={!loadStatus}
              onClick={onSaveButtonClickHandler}
            >
              {loadStatus ? 'Сохранить результат' : 'Загрузка...'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Calculator;
