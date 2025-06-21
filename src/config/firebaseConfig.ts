// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jibstores.firebaseapp.com",
  projectId: "jibstores",
  storageBucket: "jibstores.firebasestorage.app",
  messagingSenderId: "870496580230",
  appId: "1:870496580230:web:45434cb1ed479ff4049707",
  measurementId: "G-V8NLS6G50W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);

export default app
// const analytics = getAnalytics(app);