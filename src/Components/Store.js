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
        // Webpack 1.0 without router-redux bind: store.replaceReducer(require('./RootReducer').default);
        // Webpack 2.0 with router-redux bind:  store.replaceReducer(rootReducer(history))
        // Webpack 1.0 with router-redux bind (as below): 
        const nextRootReducer = require('./RootReducer').default
        store.replaceReducer(nextRootReducer)
    });
}

  return store;
}