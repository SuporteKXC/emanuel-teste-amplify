import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';

import ducks from './ducks'
import sagas from './sagas';

const persistedReducer = persistReducer(
  {
    key: 'comex-iff.v0.0.1',
    whitelist: ['auth', 'paginationCache', 'country'],
    storage,
  },
  ducks
);

const sagaMiddleware = createSagaMiddleware({
  onError: (error) => {
    console.log('SAGA ERROR', error?.message);
  },
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // we will igone serialization checks for the selected action paths
      serializableCheck: {
        ignoredActionPaths: ['register', 'rehydrate', 'onSuccess', 'onFailure', 'postData'],
      },
    }).concat(sagaMiddleware),
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(sagas);
