import { combineReducers } from 'redux';
import productListReducer from 'services/productList/reducer';
import userAuthenticationReducer from './authentication/reducer';
import loadingReducer from './loading/reducer';
// import popUpReducer from './popup/actions';

export default combineReducers({
  products: productListReducer,
  auth: userAuthenticationReducer,
  loading: loadingReducer,
  // popUp: popUpReducer,
});
