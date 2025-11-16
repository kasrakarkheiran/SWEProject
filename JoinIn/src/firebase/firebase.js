import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAuhWJ-yCl89QxGFqesXb5dcwS6R5ZbWdA",

  authDomain: "joinin-900fd.firebaseapp.com",

  projectId: "joinin-900fd",

  storageBucket: "joinin-900fd.firebasestorage.app",

  messagingSenderId: "1047056046476",

  appId: "1:1047056046476:web:d3a3e5abc6541f0f441ea9"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };