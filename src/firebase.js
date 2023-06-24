// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCAiWl_AXuvnlfFhyhM_AY55FkbKAHyKqE",
//   authDomain: "react-todo-2023.firebaseapp.com",
//   projectId: "react-todo-2023",
//   storageBucket: "react-todo-2023.appspot.com",
//   messagingSenderId: "403249565761",
//   appId: "1:403249565761:web:ac05e12cbd2c8469df76c0",
//   measurementId: "G-KSD1GG7DW9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
//from 1st may
const firebaseConfig = {
    apiKey: "AIzaSyCAiWl_AXuvnlfFhyhM_AY55FkbKAHyKqE",
    authDomain: "react-todo-2023.firebaseapp.com",
    projectId: "react-todo-2023",
    storageBucket: "react-todo-2023.appspot.com",
    messagingSenderId: "403249565761",
    appId: "1:403249565761:web:ac05e12cbd2c8469df76c0",
    measurementId: "G-KSD1GG7DW9"
  };
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }