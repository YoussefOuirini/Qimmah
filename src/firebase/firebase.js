import firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';
import { config } from '../config.js';

firebase.initializeApp(config.firebase);

export const firestore = firebase.firestore;
export const db = firebase.firestore();
export const auth = firebase.auth();
export const ui = new firebaseui.auth.AuthUI(auth);

export { getAllRegistrations, writeRegistration, updateRegistration, getUsersRegistrations } from './registrations';
export { getLessonsOf, getDateLessons, writeLessons, update } from './lessons';
export { storeAbsence, getAbsence, getAllAbsentees } from './absence';
export { getGroups, createGroup } from './groups';
export { deleteStudent, removeStudentFromGroups, writeStudentToGroup } from './students';
export { addToTeachers, updateGroupTeacher, removeGroupTeacher, getGroupsOf, getStudentsOf, userIs } from './teachers';
export { getCurrentUser, getUserEmail, checkUserClaim, signOut } from './auth';

export function getStudentDocName(student) {
  const studentDocName = `${student.name.first}${student.name.last}${student.education}`;
  const filteredStudentDocName = studentDocName.replace(/\s+/g, '');
  return filteredStudentDocName;
}