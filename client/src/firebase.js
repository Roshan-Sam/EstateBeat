// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-7b513.firebaseapp.com",
    projectId: "mern-estate-7b513",
    storageBucket: "mern-estate-7b513.appspot.com",
    messagingSenderId: "539739073505",
    appId: "1:539739073505:web:f80017d8479634e8ed40a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);