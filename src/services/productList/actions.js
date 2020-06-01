import {
  REMOVE_PRODUCT,
  FETCH_PRODUCTS,
  MAKE_PRODUCT_LIST,
  OPEN_POPUP,
  CLOSE_POPUP,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  CLEAR_MESSAGE,
} from 'services/actionTypes';
import {
  getCurrentUserPantry,
  uploadImage,
  getImageURL,
  addProductToPantry,
  removeProductsFromPantry,
  editProductInPantry,
} from '../../firebase/index';

export const openPopUp = (productId) => {
  return {
    type: OPEN_POPUP,
    payload: productId,
  };
};

export const closePopUp = () => {
  return {
    type: CLOSE_POPUP,
  };
};

export const addProduct = (name, category, image, unit, isMax, isLow, currently) => async (
  dispatch,
) => {
  try {
    let imageURL = null;
    if (image) {
      await uploadImage(image);
      imageURL = await getImageURL(image.name);
    }
    await addProductToPantry(name, category, imageURL, unit, isMax, isLow, currently);
    const succesMes = 'Product added';
    dispatch({
      type: ADD_PRODUCT,
      payload: succesMes,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
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

export const fetchSingleProduct = (productId) => async () => {
  const userPantry = await getCurrentUserPantry();
  const product = userPantry.find((item) => item.id === productId);
  return product;
};

export const fetchProducts = () => async (dispatch) => {
  const userPantry = await getCurrentUserPantry();
  const sortedPantry = sortProducts(userPantry);

  dispatch({
    type: FETCH_PRODUCTS,
    payload: sortedPantry,
  });
};

export const getShoppingList = () => async (dispatch, getState) => {
  let { storage } = getState().products;

  if (storage.length === 0 || !storage) {
    storage = await getCurrentUserPantry();
  }

  const shoppingList = storage.filter((item) => item.currently <= item.isLow);
  dispatch({
    type: MAKE_PRODUCT_LIST,
    payload: shoppingList,
  });
};

export const removeProduct = (productId) => async (dispatch) => {
  await removeProductsFromPantry(productId);
  dispatch({
    type: REMOVE_PRODUCT,
  });
};

export const editProduct = (id, name, category, image, img, unit, currently) => async (
  dispatch,
) => {
  try {
    let imageURL = img;
    if (image) {
      imageURL = await getImageURL(image);
    }
    await editProductInPantry(id, name, category, unit, currently, imageURL);
    const succesMes = 'Product edited';
    dispatch({
      type: EDIT_PRODUCT,
      payload: {
        succesMes,
      },
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 4000);
  } catch (error) {
    alert(error.message);
  }
};
