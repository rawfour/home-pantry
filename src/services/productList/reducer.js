import {
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_DONE,
  OPEN_POPUP,
  CLOSE_POPUP,
  ADD_PRODUCT,
  FETCH_BEGIN,
  EDIT_PRODUCT,
  CLEAR_MESSAGE,
  CHOOSE_IMAGE,
  UPLOAD_IMAGE,
} from 'services/actionTypes';

const initialState = {
  storage: [],
  isPopUpOpen: false,
  toRemove: null,
  shoppingList: [],
  loading: false,
  actionDone: false,
  image: null,
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
    case FETCH_BEGIN:
      return {
        ...state,
        loading: true,
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
        image: null,
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
    case CHOOSE_IMAGE:
      return {
        ...state,
        image: action.payload.image,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        image: null,
      };
    default:
      return state;
  }
};

export default productListReducer;
