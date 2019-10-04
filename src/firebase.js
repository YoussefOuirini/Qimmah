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

export async function getRegistrations() {
  const querySnapshot = await db.collection("registrations").where("email", "==", firebase.auth().currentUser.email).get();
  let registrations = [];
  querySnapshot.forEach((doc) => {
    registrations.push(doc.data())
  });
  return registrations;
}