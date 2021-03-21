const firebase = require("firebase/app");
const admin = require('firebase-admin');
const dotenv = require('dotenv').config({path:'./config/.env'});

const serviceAccount = require("./config/serviceAccountKey.json");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

//const firebaseConfig = dotenv.parsed.FIREBASE_CONFIG;

// Firebase products
require("firebase/auth");
require("firebase/firestore");

// Initialize Firebase and Firestore
//firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASEURL
})
const db = admin.firestore();
module.exports = {db, admin};