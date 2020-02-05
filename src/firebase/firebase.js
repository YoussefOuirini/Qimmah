import firebase from "firebase/app";
import 'firebase/firestore';
import { config } from '../config.js';

firebase.initializeApp(config.firebase);

export const db = firebase.firestore();
export const auth = firebase.auth();

export { getAllRegistrations, writeRegistration, updateRegistration, getUsersRegistrations } from './registrations';
export { getLessons, getDateLessons, writeLessons } from './lessons';
export { storeAbsence, getAbsence, getAllAbsentees } from './absence';
export { getGroups, createGroup } from './groups';
export { deleteStudent, removeStudentFromGroups, writeStudentToGroup } from './students';
export { updateGroupTeacher, removeGroupTeacher } from './teachers';
export { checkUserClaim } from './auth';


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