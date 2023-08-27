// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5XCOuUbY0aPY3mKVBgy7CerCkLf9kQ_o",
  authDomain: "gappnadero-pwa.firebaseapp.com",
  projectId: "gappnadero-pwa",
  storageBucket: "gappnadero-pwa.appspot.com",
  messagingSenderId: "544904643491",
  appId: "1:544904643491:web:d60b31d8dc598824fa1016",
  measurementId: "G-04MWNQQY8P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();