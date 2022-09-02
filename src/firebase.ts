// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWPIXT6Gi1l-eWStjkOZZuuDJjiC0O_68",
  authDomain: "data-indexer-d4f25.firebaseapp.com",
  projectId: "data-indexer-d4f25",
  storageBucket: "data-indexer-d4f25.appspot.com",
  messagingSenderId: "941519543837",
  appId: "1:941519543837:web:0506c4499f3431018770f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);