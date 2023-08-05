// store.js
import { createStore, combineReducers } from 'redux';
import productReducer from '../redux/reducer';

const rootReducer = combineReducers({
  product: productReducer,
});

const store = createStore(rootReducer);

export default store;
