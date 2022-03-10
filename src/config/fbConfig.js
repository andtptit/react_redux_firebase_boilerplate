import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBg5frCnKGq967fABvze8sfZk7hEQcg-vQ",
    authDomain: "flash-kid-9364b.firebaseapp.com",
    projectId: "flash-kid-9364b",
    storageBucket: "flash-kid-9364b.appspot.com",
    messagingSenderId: "933367001873",
    appId: "1:933367001873:web:96c57de2fca164c54ad2b0",
    measurementId: "G-9GQ85NHMYE"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const storage = firebase.storage();
const functions = firebase.functions();
const auth = firebase.auth();
const db = firebase.firestore();


export {
    storage,
    functions,
    firebase as default
}
