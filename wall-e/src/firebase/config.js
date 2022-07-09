import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnBvm0C7RxIZNWWoUbA9BW5sDBPWeM1is",
    authDomain: "wall-e-b558d.firebaseapp.com",
    projectId: "wall-e-b558d",
    storageBucket: "wall-e-b558d.appspot.com",
    messagingSenderId: "336612807714",
    appId: "1:336612807714:web:bb77e0bf47f5fc7948e67b",
    measurementId: "G-C8EDMRW87V"
};

// Initialising firebase
const app = initializeApp(firebaseConfig);

// Initialising firestore
const db = getFirestore(app);


// Initialising firebase authentication
const auth = getAuth();

export { db, auth };