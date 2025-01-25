import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCWAL0Xh1T6IIDLNxTb9VFS37ekPt1uNaA",
    authDomain: "student-managementz.firebaseapp.com",
    projectId: "student-managementz",
    storageBucket: "student-managementz.firebasestorage.app",
    messagingSenderId: "909226660714",
    appId: "1:909226660714:web:cb017f036aa0d6b536cb13",
    measurementId: "G-1QQB91S9BS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);