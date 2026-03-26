import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMUzl4o8WGxbk3DVo97Bz-6wQ2-AsXyzA",
  authDomain: "kl-tournament.firebaseapp.com",
  projectId: "kl-tournament",
  storageBucket: "kl-tournament.firebasestorage.app",
  messagingSenderId: "36701184762",
  appId: "1:36701184762:web:8248ef422c0aba6b729f43",
  measurementId: "G-8MZPR2LZPC",
};

function getApp() {
  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
}

export function getFirebaseAuth() {
  return getAuth(getApp());
}

export function getFirebaseDb() {
  return getFirestore(getApp());
}
