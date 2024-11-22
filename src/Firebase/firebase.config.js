// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAilIVEkJiPI1BGRk82W7Rt90g3HlVZYjQ",
  authDomain: "vape-bazzar.firebaseapp.com",
  projectId: "vape-bazzar",
  storageBucket: "vape-bazzar.firebasestorage.app",
  messagingSenderId: "148255867770",
  appId: "1:148255867770:web:9f2e0dd253b942cf2f4cc3",
  measurementId: "G-WCEXLF003H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
