
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

   const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyBx0W4Cekjzt3-07Y_bdj-a6VeP_HuVem0",
    authDomain: "artdock-ea1ac.firebaseapp.com",
    projectId: "artdock-ea1ac",
    storageBucket: "artdock-ea1ac.appspot.com",
    messagingSenderId: "369851063125",
    appId: "1:369851063125:web:6fe8a5b989762c3afa6ddc",
    measurementId: "G-84C6HNVWZR"
   });

   const db =getFirestore();
   const auth = getAuth(firebaseApp)
   const storage = getStorage(firebaseApp)

   export { db, auth, storage }