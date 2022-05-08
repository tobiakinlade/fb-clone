// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCDflfOZq1Wj0aHGFKi4KzdKBOGKyB3k3c',
  authDomain: 'fb-papafam.firebaseapp.com',
  projectId: 'fb-papafam',
  storageBucket: 'fb-papafam.appspot.com',
  messagingSenderId: '885895829092',
  appId: '1:885895829092:web:be068c7e3b00b175d97171',
  measurementId: 'G-YM279Y90T3',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { db, storage, app };
