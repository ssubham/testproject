import { createStore, applyMiddleware , compose} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../redux/reducers';
import rootSaga from '../redux/sagas';

let store = null;

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const configureStores = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  store = {
    ...createStore(
      persistedReducer,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    ),
    runSagas: sagaMiddleware.run(rootSaga)
  };
  return { store };
};
export const dispatch = (...args) => store?.dispatch(...args);

// export default {
//   dispatch,
//   configureStore
// };
