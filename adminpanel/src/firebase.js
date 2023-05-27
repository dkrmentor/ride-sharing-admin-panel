// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDfkKnlcrf6XJ3ZazdJTr7dj9ehrKApoSc",
  authDomain: "kiet-ride-sharing-app.firebaseapp.com",
  databaseURL: "https://kiet-ride-sharing-app-default-rtdb.firebaseio.com",
  projectId: "kiet-ride-sharing-app",
  storageBucket: "kiet-ride-sharing-app.appspot.com",
  messagingSenderId: "196706800442",
  appId: "1:196706800442:web:aef2f39c370cfa9f46b603",
  measurementId: "G-NEEFSFZ172"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();


export default database;
