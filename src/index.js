import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import './style/app.sass';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './store/reducer';
import {createAPI} from './axios/api';

const api = createAPI(() => {});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
