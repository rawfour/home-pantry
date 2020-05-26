import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

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

export const getCurrentUsername = () => {
  return auth.currentUser && auth.currentUser.displayName;
};
