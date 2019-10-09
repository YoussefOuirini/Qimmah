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

export async function createGroup(group) {
  const userIsModerator = await checkIfUserIsModerator();
  if (!userIsModerator) {
    return new Error('User not authorized.')
  }
  return db.collection("groups").add(group)
    .then((docRef)=> {
      return docRef
    })
    .catch((error)=> {
      throw new Error(error)
    });
}

export async function getGroups() {
  const querySnapshot = await db.collection("groups").get();
  let groups = [];
  querySnapshot.forEach((doc) => {
    groups.push(doc.data())
  });
  return groups;
}

export async function addTeacherToGroup(teacherEmail, groupName) {
  const userIsModerator = await checkIfUserIsModerator();
  if (!userIsModerator) {
    return new Error('User not authorized.')
  }
  const group = await getGroup(groupName)
  const updateResponse = await updateGroup(group, {teacher: teacherEmail});
  return updateResponse
}

export async function checkIfUserIsModerator() {
  const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
  return idTokenResult.claims.moderator;
}

async function getGroup(groupName) {
  const querySnapshot = await db.collection("groups").where("groupName", "==", groupName).get();
  let groups = [];
  querySnapshot.forEach((doc) => {
    groups.push(doc.id)
  });
  return groups[0];
}

async function updateGroup(group, newUpdate) {
  const groupRef = db.collection("groups").doc(group);
  return groupRef.update(newUpdate)
}