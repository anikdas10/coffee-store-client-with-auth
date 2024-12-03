// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq8VjmOeHOF0xIvVkSYpU_p0WokLgN6nI",
  authDomain: "coffee-store-fe4c2.firebaseapp.com",
  projectId: "coffee-store-fe4c2",
  storageBucket: "coffee-store-fe4c2.firebasestorage.app",
  messagingSenderId: "304805063747",
  appId: "1:304805063747:web:232496ded72013939fb8f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
