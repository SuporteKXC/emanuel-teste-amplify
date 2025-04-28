import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './ducks';
import sagas from './sagas';

const persistedRedurcer = persistReducer(
  {
    key: 'bayer-base-v.1.0',
    whitelist: ['auth'],
    storage,
  },
  reducers
);

const middlewares = [];

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
  onError: (error, errorInfo): void => {
    console.log('SAGA ERROR', error, errorInfo);
  },
});

middlewares.push(sagaMiddleware);

const composer =
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
    : compose(applyMiddleware(...middlewares));

const store = createStore(persistedRedurcer, composer);
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
sagaMiddleware.run(sagas);

export { store, persistor };
