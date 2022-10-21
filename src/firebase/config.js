// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcV81gtEPWFaBwvAx71HuP3pZFsDySz9o",
    authDomain: "rest-api-journalapp.firebaseapp.com",
    projectId: "rest-api-journalapp",
    storageBucket: "rest-api-journalapp.appspot.com",
    messagingSenderId: "901703190550",
    appId: "1:901703190550:web:b9fa3564c8a4f7506ccd37"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore( FirebaseApp );

