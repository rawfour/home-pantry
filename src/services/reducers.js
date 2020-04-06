import { combineReducers } from 'redux';
import productListReducer from 'services/productList/reducer';

export default combineReducers({
  products: productListReducer,
});
