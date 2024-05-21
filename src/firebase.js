// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcBuAgvakyZJp7r98AqmdHoAKPx_3lHCQ",
  authDomain: "safetrade-43052.firebaseapp.com",
  projectId: "safetrade-43052",
  storageBucket: "safetrade-43052.appspot.com",
  messagingSenderId: "822711003097",
  appId: "1:822711003097:web:ccbc7cdceab29327d69bc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };