
// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getFunctions } from "firebase/functions"

const firebaseConfig = {
  apiKey: "AIzaSyAzdhn7pea1M7fsqUdjFvU9jpox1PdcWcs",
  authDomain: "sshs-treasure-2023.firebaseapp.com",
  projectId: "sshs-treasure-2023",
  storageBucket: "sshs-treasure-2023.appspot.com",
  messagingSenderId: "218461744402",
  appId: "1:218461744402:web:9750550221528a5f0b57cb"
};


export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const functions = getFunctions(app, 'us-central1')