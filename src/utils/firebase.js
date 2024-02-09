// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDawaQ-lurft5G_xA7kizVG6DFM4NtjlCU",
  authDomain: "netflixgpt-f6409.firebaseapp.com",
  projectId: "netflixgpt-f6409",
  storageBucket: "netflixgpt-f6409.appspot.com",
  messagingSenderId: "652318915860",
  appId: "1:652318915860:web:8bd0dc4a23849940935601",
  measurementId: "G-9QRGFJHD5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth()