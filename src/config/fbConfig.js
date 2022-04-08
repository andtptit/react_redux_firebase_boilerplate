import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCMzKpyUePLbvU5BA3b4PUvNABIefMCXiE",
    authDomain: "tuvungtienghanthaytu-2f56b.firebaseapp.com",
    projectId: "tuvungtienghanthaytu-2f56b",
    storageBucket: "tuvungtienghanthaytu-2f56b.appspot.com",
    messagingSenderId: "897134720210",
    appId: "1:897134720210:web:30131fe68b81576203a90b",
    measurementId: "G-H8VM58Z48W"
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
