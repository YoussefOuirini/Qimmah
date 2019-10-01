import firebase from "firebase";

var db = firebase.firestore();

export async function writeRegistration(registration) {
  db.collection("registrations").add(registration)
    .then((docRef)=> {
      return docRef
    })
    .catch((error)=> {
      throw new Error(error)
    });
}