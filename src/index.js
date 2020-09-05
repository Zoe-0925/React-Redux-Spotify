import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';
import RootReducer from "./core/RootReducer"
import RootSaga from "./core/RootSaga"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import history from "./core/history"

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(RootReducer, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(RootSaga);

if (module.hot) {
  module.hot.accept()
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
