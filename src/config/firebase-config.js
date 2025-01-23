
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "wazoo-6d3ae.firebaseapp.com",
  projectId: "wazoo-6d3ae",
  storageBucket: "wazoo-6d3ae.firebasestorage.app",
  messagingSenderId: "354594393227",
  appId: "1:354594393227:web:0298f3bcaa10496f8a588e"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };