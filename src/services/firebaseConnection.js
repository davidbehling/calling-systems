import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyD2a00QQ1QMQ2d54T_aEKUs6XKUv-uDoRI",
  authDomain: "calling-systems.firebaseapp.com",
  projectId: "calling-systems",
  storageBucket: "calling-systems.appspot.com",
  messagingSenderId: "711504467967",
  appId: "1:711504467967:web:9ac20887e379bb8f26b9ca",
  measurementId: "G-YDS2GN5SCY"
}

const firebase = initializeApp(firebaseConfig)

const auth = getAuth(firebase)
const db = getFirestore(firebase)
const storage = getStorage(firebase)

export { auth, db, storage }