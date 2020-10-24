const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyCnpmFxTTaEFuGu-DweMM3sQFH1v_xT7TE",
  authDomain: "teammate-finder-b5bd4.firebaseapp.com",
  databaseURL: "https://teammate-finder-b5bd4.firebaseio.com",
  projectId: "teammate-finder-b5bd4",
  storageBucket: "teammate-finder-b5bd4.appspot.com",
  messagingSenderId: "1047193842414",
  appId: "1:1047193842414:web:f7274429d193a41acd39ff",
  measurementId: "G-T3V4P54TTX"
};

// Firebase products
require("firebase/auth");
require("firebase/firestore");

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = db;