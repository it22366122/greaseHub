// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "greasehub-b8335.firebaseapp.com",
  projectId: "greasehub-b8335",
  storageBucket: "greasehub-b8335.appspot.com",
  messagingSenderId: "632873104375",
  appId: "1:632873104375:web:00627e6a9bbc440211f4f2",
  measurementId: "G-CP35QXST5X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
