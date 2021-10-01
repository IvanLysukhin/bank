import {createReducer} from '@reduxjs/toolkit';
import {
  saveResult,
  clearResults,
  loadStartCurrency,
  loadEndCurrency,
  loadData
} from './actions';
import {RESULTS_MAX_NUMBER} from '../constants';

const initialState = {
  results: [],
  startCurrency: 0,
  endCurrency: 0,
  isDataLoad: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveResult, (state, action) => {
      state.results = [action.payload, ...state.results].slice(0, RESULTS_MAX_NUMBER);
    })
    .addCase(clearResults, (state, action) => {
      state.results = [];
    })
    .addCase(loadStartCurrency, (state, action) => {
      state.startCurrency = action.payload;
    })
    .addCase(loadEndCurrency, (state, action) => {
      state.endCurrency = action.payload;
    })
    .addCase(loadData, (state, action) => {
      state.isDataLoad = action.payload;
    });
});
