import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDT3IjoNNzr-V1spO3zgyG7_QlM30PZdvs",
    authDomain: "nwitter-28dab.firebaseapp.com",
    projectId: "nwitter-28dab",
    storageBucket: "nwitter-28dab.appspot.com",
    messagingSenderId: "247012883275",
    appId: "1:247012883275:web:9159eb62570ffffe2146ce"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export const authService=firebase.auth();