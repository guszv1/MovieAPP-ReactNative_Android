import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAruT6YTvfUEC7uR_zDKb5YN95Oy-ite-E",
  authDomain: "tdspr-crafters.firebaseapp.com",
  databaseURL: "https://tdspr-crafters-default-rtdb.firebaseio.com",
  projectId: "tdspr-crafters",
  storageBucket: "tdspr-crafters.firebasestorage.app",
  messagingSenderId: "1016466799326",
  appId: "1:1016466799326:web:254694d9a825ab946b204f",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
