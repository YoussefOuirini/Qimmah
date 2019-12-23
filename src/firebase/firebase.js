import firebase from "firebase/app";
import 'firebase/firestore';
import { config } from '../config.js';
import { checkUserClaim, getUserEmail } from "./auth";

firebase.initializeApp(config.firebase);

export const db = firebase.firestore();
export const auth = firebase.auth();

export { getAllRegistrations, writeRegistration, updateRegistration } from './registrations';
export { getLessons, getDateLessons, writeLessons } from './lessons';
export { storeAbsence, getAbsence, getAllAbsentees } from './absence';
export { getGroups, createGroup } from './groups';
export { deleteStudent, removeStudentFromGroups, writeStudentToGroup } from './students';

export async function getUsersRegistrations() {
  const querySnapshot = await db.collection("registrations").where("email", "==", getUserEmail()).get();
  let registrations = [];
  querySnapshot.forEach((doc) => {
    registrations.push(doc.data());
  });
  return registrations;
}

export async function updateGroupTeacher(teacherEmail, groupName) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.');
  }
  const group = await getGroup(groupName);
  const groupRef = await db.collection("groups").doc(group);
  return groupRef.update({
    teachers: firebase.firestore.FieldValue.arrayUnion(teacherEmail)
  });
}

export async function removeGroupTeacher(teacherEmail, groupName) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.');
  }
  const group = await getGroup(groupName);
  const groupRef = await db.collection("groups").doc(group);
  return groupRef.update({
    teachers: firebase.firestore.FieldValue.arrayRemove(teacherEmail)
  });
}

export async function getGroupsOf(teacherEmail) {
  const querySnapshot = await db.collection("groups").where("teachers", "array-contains", teacherEmail).get();
  let teachersGroups = [];
  querySnapshot.forEach(async (doc) => {
    const teachersGroup = doc.data();
    const students = await getStudentsOf(teachersGroup);
    const completeGroup = Object.assign(teachersGroup, {students});
    teachersGroups.push(completeGroup);
  });
  return teachersGroups;
}

export function getStudentDocName(student) {
  const studentDocName = `${student.name.first}${student.name.last}${student.education}`;
  const filteredStudentDocName = studentDocName.replace(/\s+/g, '');
  return filteredStudentDocName;
}

export async function getStudentsOf(teachersGroup) {
  const querySnapshot = await db.collection("groups").doc(teachersGroup.groupName).collection('students').get();
  let students = [];
  querySnapshot.forEach((student) => {
    students.push(student.data());
  });
  return students;
}

async function getGroup(groupName) {
  const querySnapshot = await db.collection("groups").where("groupName", "==", groupName).get();
  let groups = [];
  querySnapshot.forEach((doc) => {
    groups.push(doc.id);
  });
  return groups[0];
}