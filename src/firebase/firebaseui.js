import firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import { auth } from './firebase';

export const uiConfig = {
  signInSuccessUrl: 'home',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

// Initialize the FirebaseUI Widget using Firebase.
export const ui = new firebaseui.auth.AuthUI(auth);