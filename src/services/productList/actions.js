import {
  FETCH_PRODUCTS,
  MAKE_PRODUCT_LIST,
  SET_LOADING,
  REMOVE_LOADING,
} from 'services/actionTypes';
import {
  getCurrentUserPantry,
  uploadImage,
  getImageURL,
  addProductToPantry,
  removeProductsFromPantry,
  editProductInPantry,
} from '../../firebase/index';

export const addProduct = (name, category, image, unit, isMax, isLow, currently) => async (
  dispatch,
) => {
  try {
    let imageURL = null;
    dispatch({
      type: SET_LOADING,
      payload: 'addProduct',
    });
    if (image) {
      await uploadImage(image);
      imageURL = await getImageURL(image.name);
    }
    await addProductToPantry(name, category, imageURL, unit, isMax, isLow, currently);
    setTimeout(() => {
      dispatch({
        type: REMOVE_LOADING,
        payload: 'addProduct',
      });
    }, 5000);
  } catch (error) {
    alert(error.message);
  }
};

export const sortProducts = (products) => {
  const sortedList = products.sort(
    (a, b) => (a.currently / a.isMax) * 100 - (b.currently / b.isMax) * 100,
  );

  return sortedList;
};

export const fetchSingleProduct = (productId) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: 'fetchSingle',
  });
  const userPantry = await getCurrentUserPantry();
  const product = userPantry.find((item) => item.id === productId);
  dispatch({
    type: REMOVE_LOADING,
    payload: 'fetchSingle',
  });
  return product;
};

export const fetchProducts = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: 'fetchList',
  });
  const userPantry = await getCurrentUserPantry();
  const sortedPantry = sortProducts(userPantry);

  dispatch({
    type: FETCH_PRODUCTS,
    payload: sortedPantry,
  });
  dispatch({
    type: REMOVE_LOADING,
    payload: 'fetchList',
  });
};

export const getShoppingList = () => async (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: 'shoppingList',
  });
  let { storage } = getState().products;

  if (storage.length === 0 || !storage) {
    storage = await getCurrentUserPantry();
  }

  const shoppingList = storage.filter((item) => item.currently <= item.isLow);
  dispatch({
    type: MAKE_PRODUCT_LIST,
    payload: shoppingList,
  });
  dispatch({
    type: REMOVE_LOADING,
    payload: 'shoppingList',
  });
};

export const removeProduct = (productId) => async () => {
  await removeProductsFromPantry(productId);
};

export const editProduct = (id, name, category, image, img, unit, currently) => async (
  dispatch,
) => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: 'editProduct',
    });
    let imageURL = img;
    if (image) {
      await uploadImage(image);
      imageURL = await getImageURL(image.name);
    }

    await editProductInPantry(id, name, category, unit, currently, imageURL);
    setTimeout(() => {
      dispatch({
        type: REMOVE_LOADING,
        payload: 'editProduct',
      });
    }, 1000);
  } catch (error) {
    alert(error.message);
  }
};
