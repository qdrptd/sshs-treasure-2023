
// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getFunctions } from "firebase/functions"
import { firebaseConfig } from "./firebaseconfig.js"



export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const functions = getFunctions(app, 'us-central1')