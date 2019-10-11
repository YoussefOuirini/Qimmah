import firebase from "firebase";
import { config } from './config.js'

firebase.initializeApp(config.firebase);

var db = firebase.firestore();

export async function writeRegistration(registration) {
  return db.collection("registrations").doc(`${registration.firstName}${registration.lastName}${registration.education}`).set(registration)
    .then(()=> {
      return {success: true}
    })
    .catch((error)=> {
      throw new Error(error)
    });
}

export async function getUsersRegistrations() {
  const querySnapshot = await db.collection("registrations").where("email", "==", firebase.auth().currentUser.email).get();
  let registrations = [];
  querySnapshot.forEach((doc) => {
    registrations.push(doc.data())
  });
  return registrations;
}

export async function getAllRegistrations() {
  const querySnapshot = await db.collection("registrations").get();
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
  return db.collection("groups").doc(group.groupName).set(group)
    .then(()=> {
      return {success: true}
    })
    .catch((error)=> {
      throw new Error(error)
    });
}

export async function deleteStudent(student) {
  const studentDocName = `${student.firstName}${student.lastName}${student.education}`;
  await db.collection('registrations').doc(studentDocName).delete();
  const allGroups = await getGroups();
  await removeStudentFromGroups(student, allGroups);
}

export async function getGroups() {
  const querySnapshot = await db.collection("groups").get();
  let groups = [];
  querySnapshot.forEach((doc) => {
    groups.push(doc.data())
  });
  return groups;
}

export async function removeStudentFromGroups(student, groups) {
  const userIsModerator = await checkIfUserIsModerator();
  if (!userIsModerator) {
    return new Error('User not authorized.')
  }
  const studentDocName = `${student.firstName}${student.lastName}${student.education}`;
  groups.forEach((group) => {
    db.collection('groups').doc(group.groupName).collection('students').doc(studentDocName).delete()
      .catch((error) => {
        return new Error("Error removing document: ", error)
      });
  })
}

export async function writeStudentToGroup(student, groupName) {
  const userIsModerator = await checkIfUserIsModerator();
  if (!userIsModerator) {
    return new Error('User not authorized.')
  }
  const studentDocName = `${student.firstName}${student.lastName}${student.education}`;
  return db.collection('groups').doc(groupName).collection('students').doc(studentDocName).set(student);
}

export async function updateGroupTeacher(teacher, groupName) {
  const userIsModerator = await checkIfUserIsModerator();
  if (!userIsModerator) {
    return new Error('User not authorized.')
  }
  const group = await getGroup(groupName);
  const groupRef = await db.collection("groups").doc(group);
  return groupRef.update(teacher);
}

export async function updateRegistration(registration, groupName) {
  const userIsModerator = await checkIfUserIsModerator();
  if (!userIsModerator) {
    return new Error('User not authorized.')
  }
  const registrationRef = db.collection("registrations").doc(`${registration.firstName}${registration.lastName}${registration.education}`);
  return registrationRef.update({
    group: groupName
  }).then(() => {
    return {success: true}
  }).catch((error) => {
    return new Error('Error updating document: ', error)
  });
}

export async function checkIfUserIsModerator() {
  const loggedInUser = firebase.auth().currentUser;
  if (loggedInUser) {
    const idTokenResult = await loggedInUser.getIdTokenResult();
    return idTokenResult.claims.moderator;
  }
}

async function getGroup(groupName) {
  const querySnapshot = await db.collection("groups").where("groupName", "==", groupName).get();
  let groups = [];
  querySnapshot.forEach((doc) => {
    groups.push(doc.id)
  });
  return groups[0];
}