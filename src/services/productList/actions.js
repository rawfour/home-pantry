import {
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_DONE,
  OPEN_POPUP,
  CLOSE_POPUP,
  ADD_PRODUCT,
  FETCH_SINGLE_PRODUCT,
  FETCH_BEGIN,
  EDIT_PRODUCT,
  CLEAR_MESSAGE,
  CHOOSE_IMAGE,
  UPLOAD_IMAGE,
  REMOVE_IMAGE,
} from 'services/actionTypes';
import firebase, { storage } from 'firebase/index';

export const setImage = (file) => {
  const error = {
    isError: false,
    errorMes: null,
  };
  let image = null;
  if (!(file.type === 'image/png' || file.type === 'image/jpeg')) {
    error.errorMes = 'Incorrect file format, use JPG or PNG instead.';
    error.isError = true;
  } else if (file.size > 300000) {
    error.errorMes = 'Size of file is too big. Files should weigh less than 300kB.';
    error.isError = true;
  } else {
    image = file;
  }

  return {
    type: CHOOSE_IMAGE,
    payload: { image, error },
  };
};

export const removeImage = () => {
  return {
    type: REMOVE_IMAGE,
  };
};

async function uploadTaskPromise(image) {
  return new Promise(function (resolve, reject) {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',

      () => {
        // progress bar here, but in future :)
      },
      (throwError) => {
        console.log('error', throwError);
        reject();
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((destUrl) => {
            resolve(destUrl);
          });
      },
    );
  });
}

export const setUrl = (image) => async (dispatch) => {
  try {
    const url = await uploadTaskPromise(image);
    dispatch({
      type: UPLOAD_IMAGE,
      payload: url,
    });
  } catch (showError) {
    console.log('ERR===', showError);
  }
};

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

async function getImageTaskPromise(image) {
  return new Promise(function (resolve, reject) {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      () => {
        // progress bar here, but in future :)
      },
      (throwError) => {
        console.log('error', throwError);
        reject();
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((destUrl) => {
            resolve(destUrl);
          });
      },
    );
  });
}

export const addProduct = (
  name,
  category,
  image,
  unit,
  isMax,
  isLow,
  currently,
  succesMes,
) => async (dispatch) => {
  try {
    const url = await getImageTaskPromise(image);
    firebase
      .firestore()
      .collection('products')
      .add({
        name,
        category,
        unit,
        isMax: isMax * 1,
        isLow: isLow * 1,
        currently: currently * 1,
        img: url,
      });
    dispatch({
      type: ADD_PRODUCT,
      payload: succesMes,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 5000);
  } catch (showError) {
    console.log('ERR===', showError);
  }
};

async function getSingleProductTaskPromise(productId) {
  return new Promise(function (resolve) {
    firebase
      .firestore()
      .collection('products')
      .onSnapshot((snapshot) => {
        const currentProduct = snapshot.docs
          .map((item) => ({
            id: item.id,
            ...item.data(),
          }))
          .filter((item) => item.id === productId);
        resolve(...currentProduct);
      });
  });
}

export const fetchSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BEGIN });
    const getSingleProduct = await getSingleProductTaskPromise(productId);
    dispatch({
      type: FETCH_SINGLE_PRODUCT,
      payload: getSingleProduct,
    });
  } catch (showError) {
    console.log('ERR===', showError);
  }
};

async function getProductsTaskPromise() {
  return new Promise(function (resolve) {
    firebase
      .firestore()
      .collection('products')
      .onSnapshot((snapshot) => {
        const newProductList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        resolve(newProductList);
      });
  });
}

const getShoppingList = (products) => {
  const shoppingList = products.filter((item) => item.currently <= item.isLow);
  return shoppingList;
};

export const fetchProducts = () => async (dispatch) => {
  try {
    const getProducts = await getProductsTaskPromise();
    const makeShoppingList = await getShoppingList(getProducts);
    dispatch({
      type: FETCH_PRODUCTS_DONE,
      payload: { getProducts, makeShoppingList },
    });
  } catch (showError) {
    console.log('ERR===', showError);
  }
};

async function removeProductsTaskPromise(productId) {
  return new Promise(function (resolve) {
    firebase
      .firestore()
      .collection('products')
      .doc(productId)
      .delete()
      .then(function () {
        resolve();
      })
      .catch(function (showError) {
        console.log('ERR===', showError);
      });
  });
}

export const removeProduct = (inStorage, productId) => async (dispatch) => {
  // const newProductList = inStorage.filter((item) => item.id !== productId);
  await removeProductsTaskPromise(productId);
  const getProducts = await getProductsTaskPromise();
  dispatch({
    type: REMOVE_PRODUCT,
    payload: getProducts,
  });
};

async function updateTaskPromise(id, name, category, unit, currently, currentUrl) {
  return new Promise(function (resolve) {
    firebase
      .firestore()
      .collection('products')
      .doc(id)
      .update({
        name,
        category,
        unit,
        currently: currently * 1,
        img: currentUrl,
      })
      .then(() => {
        resolve();
      });
  });
}

export const editProduct = (id, name, category, image, img, unit, currently, succesMes) => async (
  dispatch,
) => {
  try {
    let currentUrl = img;
    if (image) {
      currentUrl = await getImageTaskPromise(image);
    }
    await updateTaskPromise(id, name, category, unit, currently, currentUrl);
    const getSingleProduct = await getSingleProductTaskPromise(id);

    dispatch({
      type: EDIT_PRODUCT,
      payload: { getSingleProduct, succesMes },
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 5000);
  } catch (showError) {
    console.log('ERR===', showError);
  }
};
