import {
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_DONE,
  OPEN_POPUP,
  CLOSE_POPUP,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  CLEAR_MESSAGE,
} from 'services/actionTypes';

const initialState = {
  storage: [],
  isPopUpOpen: false,
  toRemove: null,
  shoppingList: [],
  actionDone: false,
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT:
      return {
        ...state,
        storage: action.payload,
        isPopUpOpen: false,
        toRemove: null,
      };
    case FETCH_PRODUCTS_DONE:
      return {
        ...state,
        storage: action.payload.getProducts,
        shoppingList: action.payload.makeShoppingList,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        actionDone: action.payload,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        actionDone: action.payload.succesMes,
      };
    case OPEN_POPUP:
      return {
        ...state,
        isPopUpOpen: true,
        toRemove: action.payload,
      };
    case CLOSE_POPUP:
      return {
        ...state,
        isPopUpOpen: false,
        toRemove: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        actionDone: false,
      };
    default:
      return state;
  }
};

export default productListReducer;
