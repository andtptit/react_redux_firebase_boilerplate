import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyB9RyJosy_E93imr1ZNy8_RhDnSmNJsgZs",
    authDomain: "flash-card-kid.firebaseapp.com",
    projectId: "flash-card-kid",
    storageBucket: "flash-card-kid.appspot.com",
    messagingSenderId: "901379712581",
    appId: "1:901379712581:web:9f7535ace6dbf34aeca52c",
    measurementId: "G-GVDP6YNN7K"
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
