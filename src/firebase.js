import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhElj_3kG-8X09JsQS5t0IJR9I_mzYQJc",
  authDomain: "fire-baadshah-arena.firebaseapp.com",
  projectId: "fire-baadshah-arena",
  storageBucket: "fire-baadshah-arena.firebasestorage.app",
  messagingSenderId: "501695322845",
  appId: "1:501695322845:web:45747610276974719d5934",
  measurementId: "G-H336VWVB2M",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};