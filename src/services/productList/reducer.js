import { FETCH_PRODUCTS, MAKE_PRODUCT_LIST } from 'services/actionTypes';

const initialState = {
  storage: [],
  shoppingList: [],
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        storage: action.payload,
      };
    case MAKE_PRODUCT_LIST:
      return {
        ...state,
        shoppingList: action.payload,
      };
    default:
      return state;
  }
};

export default productListReducer;
