// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;
