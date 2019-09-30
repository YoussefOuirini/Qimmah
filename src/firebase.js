/* eslint-disable no-console */
import firebase from "firebase";
import { config } from './config.js'

firebase.initializeApp(config.firebase);

var db = firebase.firestore();

export function writeRegistration(registration) {
  db.collection("registrations").add(registration)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}