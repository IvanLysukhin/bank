import {
  MAX_POINT_NUMBER_LENGTH,
  MILLION_LIMIT,
  MIN_POINT_NUMBER_LENGTH,
  POINT_NUMBER_LIMIT,
  TEN_THOUSANDS_LIMIT
} from './constants';

export const formatNumber = (num) => {
  const formatNum = Number(num);

  if (formatNum > TEN_THOUSANDS_LIMIT) {

    if (formatNum >= MILLION_LIMIT) {

      return `${Math.floor(formatNum) / MILLION_LIMIT}M`;
    }

    return Math.floor(formatNum);
  }

  const numberAfterPoint = formatNum.toString().split('.')[1];

  if (numberAfterPoint) {

    if (numberAfterPoint.length < POINT_NUMBER_LIMIT) {

      return formatNum.toFixed(MIN_POINT_NUMBER_LENGTH);
    }

    return formatNum.toFixed(MAX_POINT_NUMBER_LENGTH);
  }

  return formatNum;
};

export const formatNumberToStr = (num) => new Intl.NumberFormat('ru-RU').format(num);

export const saveData = (data) => {
  const prevUsers = JSON.parse(localStorage.getItem('users'));

  if (!prevUsers) {
    localStorage.setItem('users', JSON.stringify([data]));
    return;
  }
  localStorage.setItem('users', JSON.stringify([...prevUsers, data]));
};
