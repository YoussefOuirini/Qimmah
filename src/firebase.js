import firebase from "firebase";
import { config } from './config.js'

firebase.initializeApp(config.firebase);

var db = firebase.firestore();

export async function writeRegistration(registration) {
  return db.collection("registrations").add(registration)
    .then((docRef)=> {
      return docRef
    })
    .catch((error)=> {
      throw new Error(error)
    });
}