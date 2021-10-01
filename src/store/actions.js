import {createAction} from '@reduxjs/toolkit';

const ActionType = {
  SAVE_RESULT: 'SAVE_RESULT',
  CLEAR_RESULTS: 'CLEAR_RESULTS',
  LOAD_CURRENCY_START: 'LOAD_CURRENCY_START',
  LOAD_CURRENCY_END: 'LOAD_CURRENCY_END',
  LOADING: 'LOADING',
};

export const saveResult = createAction(ActionType.SAVE_RESULT, (result) => ({
  payload: result,
}));

export const clearResults = createAction(ActionType.CLEAR_RESULTS);

export const loadStartCurrency = createAction(ActionType.LOAD_CURRENCY_START, (rate) => ({
  payload: rate,
}));

export const loadEndCurrency = createAction(ActionType.LOAD_CURRENCY_END, (rate) => ({
  payload: rate,
}));

export const loadData = createAction(ActionType.LOADING, (status) => ({
  payload: status,
}));
