// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
