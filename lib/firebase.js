import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQdeMWYZygSckrmR1EWJJ3FKnXLDWEHdA",
  authDomain: "droppi-44a43.firebaseapp.com",
  projectId: "droppi-44a43",
  storageBucket: "droppi-44a43.firebasestorage.app",
  messagingSenderId: "484519066956",
  appId: "1:484519066956:web:a76b98340ccaf6384863e9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);