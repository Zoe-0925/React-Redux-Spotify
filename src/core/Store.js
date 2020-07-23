import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './RootSaga';
import RootReducer from './RootReducer';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(RootReducer, middleware);
  sagaMiddleware.run(RootSaga);

  if (module.hot) {
    module.hot.accept('./RootReducer', () => {
      store.replaceReducer(require('./RootReducer').default);
    });
  }

  return store;
}