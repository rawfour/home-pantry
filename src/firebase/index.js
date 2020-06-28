import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import { generateId } from '../services/idGenerator';

const firebaseConfig = {
  apiKey: 'AIzaSyAfairNNKX-z3qbHdROPsp43SQ2K9CS-bg',
  authDomain: 'react-home-pantry-203f8.firebaseapp.com',
  databaseURL: 'https://react-home-pantry-203f8.firebaseio.com',
  projectId: 'react-home-pantry-203f8',
  storageBucket: 'react-home-pantry-203f8.appspot.com',
  messagingSenderId: '368675980865',
  appId: '1:368675980865:web:396fc1ac076a68b03368c0',
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// user and authentication

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return auth.signOut();
};

export const register = async (name, email, password) => {
  await auth.createUserWithEmailAndPassword(email, password);
  return auth.currentUser.updateProfile({
    displayName: name,
  });
};

export const isInitialized = () => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(resolve);
  });
};

export const getCurrentUserProfile = () => {
  const user = auth.currentUser;
  let currentUser;

  if (user != null) {
    currentUser = {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      emailVerified: user.emailVerified,
      uid: user.uid,
    };
  }

  return currentUser;
};

export const reauthUser = () => {
  const user = auth.currentUser;
  let credential;

  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      return true;
    })
    .catch((error) => {
      alert(`Error: ${error}`);
    });
};

export const updateUserEmail = (email) => {
  const user = auth.currentUser;
  let credential;

  user
    .reauthenticateWithCredential(credential)
    .then((userCredential) => {
      userCredential.user.updateEmail(email);
    })
    .catch((error) => {
      alert(`Error: ${error}`);
    });
};

export const updateUserName = (name) => {
  auth.currentUser.updateProfile({
    displayName: name,
  });
};

export const getCurrentUserPantry = async () => {
  const userRef = await firestore.collection('users').doc(auth.currentUser.uid).get();

  return userRef.get('storage');
};

// pantry and products

export const addPantry = () => {
  if (!auth.currentUser) {
    return alert('Not autorized');
  }

  return firestore.collection('users').doc(auth.currentUser.uid).set({
    userID: auth.currentUser.uid,
    userName: auth.currentUser.displayName,
    storage: [],
  });
};

export const addProductToPantry = async (
  name,
  category,
  imageURL,
  unit,
  isMax,
  isLow,
  currently,
) => {
  const newID = generateId(10);
  const userStorageRef = await firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => doc.data());

  const updatedPantry = [
    ...userStorageRef.storage,
    {
      id: newID,
      name,
      category,
      unit,
      isMax: isMax * 1,
      isLow: isLow * 1,
      currently: currently * 1,
      img: imageURL,
    },
  ];

  return firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .set({
      ...userStorageRef,
      storage: updatedPantry,
    });
};

export const removeProductsFromPantry = async (productID) => {
  const userStorageRef = await firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => doc.data());
  const updatedPantry = userStorageRef.storage.filter((item) => item.id !== productID);

  return firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .set({
      ...userStorageRef,
      storage: [...updatedPantry],
    });
};

export const editProductInPantry = async (productID, name, category, unit, currently, imageURL) => {
  const userStorageRef = await firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => doc.data());
  const searchedProduct = userStorageRef.storage.find((item) => item.id === productID);
  const restOfProducts = userStorageRef.storage.filter((item) => item.id !== productID);
  const updatedPantry = [
    ...restOfProducts,
    { ...searchedProduct, name, category, unit, currently: currently * 1, img: imageURL },
  ];

  return firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .set({
      ...userStorageRef,
      storage: [...updatedPantry],
    });
};

// product image

export const uploadImage = async (image) => {
  await storage.ref(`images/${image.name}`).put(image);
  return true;
};

export const getImageURL = async (imageName) => {
  const imageURL = await storage.ref(`images/${imageName}`).getDownloadURL();
  return imageURL;
};
