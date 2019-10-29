import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { config } from '../config.js'
import { getLessonDate } from "../common/getDate";

firebase.initializeApp(config.firebase);

const db = firebase.firestore();

export async function createSchool(school) {
  return db.collection("schools").doc(school).set({name: school, creator: firebase.auth().currentUser})
  .then(()=> {
    return {success: true}
  })
  .catch((error)=> {
    throw new Error(error)
  });
}

export async function writeRegistration(registration) {
  return db.collection("registrations").doc(`${registration.name.first}${registration.name.last}${registration.education}`).set(registration)
    .then(()=> {
      return {success: true}
    })
    .catch((error)=> {
      throw new Error(error)
    });
}

export async function getLessons() {
  const registrations = await getUsersRegistrations();
  const studentLessons = await registrations.map(async (registration) => {
    const studentDocName = `${registration.name.first}${registration.name.last}${registration.education}`;
    if (!registration.group) return;
    const querySnapshot = await db.collection('groups').doc(registration.group).collection('students').doc(studentDocName).collection('lessons').get();
    let lessons = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.date = doc.id;
      lessons.push(data);
    });
    return {
      student: registration,
      lessons
    }
  })
  return Promise.all(studentLessons);
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
  const userIsModerator = await checkUserClaim('moderator');
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
  const studentDocName = `${student.name.first}${student.name.last}${student.education}`;
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
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.')
  }
  const studentDocName = `${student.name.first}${student.name.last}${student.education}`;
  groups.forEach((group) => {
    db.collection('groups').doc(group.groupName).collection('students').doc(studentDocName).delete()
      .catch((error) => {
        return new Error("Error removing document: ", error)
      });
  })
}

export async function writeStudentToGroup(student, groupName) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.')
  }
  const updatedStudent = Object.assign(student, {group: groupName});
  const studentDocName = `${student.name.first}${student.name.last}${student.education}`;
  return db.collection('groups').doc(groupName).collection('students').doc(studentDocName).set(updatedStudent);
}

export async function updateGroupTeacher(teacherEmail, groupName) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.')
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
    return new Error('User not authorized.')
  }
  const group = await getGroup(groupName);
  const groupRef = await db.collection("groups").doc(group);
  return groupRef.update({
    teachers: firebase.firestore.FieldValue.arrayRemove(teacherEmail)
  });
}

export async function updateRegistration(registration, groupName) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.')
  }
  const registrationRef = db.collection("registrations").doc(`${registration.name.first}${registration.name.last}${registration.education}`);
  return registrationRef.update({
    group: groupName
  }).then(() => {
    return {success: true}
  }).catch((error) => {
    return new Error('Error updating document: ', error)
  });
}

export async function checkUserClaim(customClaim) {
  const loggedInUser = firebase.auth().currentUser;
  if (loggedInUser) {
    const idTokenResult = await loggedInUser.getIdTokenResult();
    return idTokenResult.claims[customClaim];
  }
}

export async function getGroupsOf(teacherEmail) {
  const querySnapshot = await db.collection("groups").where("teachers", "array-contains", teacherEmail).get();
  let teachersGroups = [];
  querySnapshot.forEach(async (doc) => {
    const teachersGroup = doc.data()
    const students = await getStudentsOf(teachersGroup);
    const completeGroup = Object.assign(teachersGroup, {students});
    teachersGroups.push(completeGroup)
  });
  return teachersGroups;
}

export async function writeLessons(lessons) {
  const userIsTeacher = await checkUserClaim('teacher');
  if (!userIsTeacher) {
    return new Error('User not authorized.')
  }
  const lessonsDate = getLessonDate();
  const batch = db.batch();
  lessons.forEach((studentGroupLesson) => {
    const {student, groupName, lesson} = studentGroupLesson;
    const studentDocName = `${student.name.first}${student.name.last}${student.education}`;
    const lessonRef = db.collection("groups").doc(groupName).collection('students').doc(studentDocName).collection('lessons').doc(lessonsDate);
    batch.set(lessonRef, lesson, {merge: true});
  })
  return batch.commit().then(()=> {
    return {success: true}
  })
  .catch((error)=> {
    throw new Error(error)
  });
}

export async function storeAbsence(absence, registration) {
  const lessonsDate = getLessonDate();
  const studentDoc = `${registration.name.first}${registration.name.last}${registration.education}`;
  return db.collection("groups").doc(registration.group).collection('students').doc(studentDoc).collection('lessons').doc(lessonsDate).set(absence, {merge: true});
}

export async function getAbsence(student) {
  const lessonsDate = getLessonDate();
  const studentDoc = `${student.name.first}${student.name.last}${student.education}`;
  const absenceRef = db.collection("groups").doc(student.group).collection('students').doc(studentDoc).collection('lessons').doc(lessonsDate);
  return absenceRef.get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    }
  }).catch((error) => {
    return error;
  });
}

export async function getAllAbsentees() {
  const groupsIDs = await getGroupsIDs()
  const groupsStudents = await getAllStudents(groupsIDs);
  const filteredGroupsStudents = groupsStudents.filter(groupStudent => groupStudent.length).flat();
  const attendants = await getAbsentStudents(filteredGroupsStudents);
  const absentees = attendants.filter((attendant) => attendant.absence.length);
  const absences = getAbsences(absentees);
  return removeDuplicate(absences);
}

async function getGroupsIDs() {
  let groupsIDs = [];
  await db.collection("groups").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      groupsIDs.push(doc.id);
    })
  })
  return groupsIDs;
}

async function getAllStudents(groupsIDs) {
  const studentsGroups = await groupsIDs.map(async (groupID) => {
    return await getStudentsOf({groupName: groupID});
  });
  return Promise.all(studentsGroups);
}

async function getAbsentStudents(groupStudents) {
  const absentStudentLessons  = await getStudentLessons(groupStudents, "presence", "Afwezig");
  const unkownReasonAbsentLessons  = await getStudentLessons(groupStudents, "reasonOfAbsence", "overige");
  const sickStudentLessons = await getStudentLessons(groupStudents, "reasonOfAbsence", "ziekte");
  return absentStudentLessons.concat(unkownReasonAbsentLessons).concat(sickStudentLessons);
}

async function getStudentLessons(groupsStudents, field, value) {
  const attendants = await groupsStudents.map(async (groupsStudent) => {
    const student = Object.assign({}, groupsStudent);
    const studentDocName = `${groupsStudent.name.first}${groupsStudent.name.last}${groupsStudent.education}`;
    let absences = [];
    await db.collection("groups").doc(groupsStudent.group).collection("students").doc(studentDocName).collection("lessons")
      .where(field, "==", value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const absence = doc.data();
          absence.date = doc.id;
          absences.push(absence);
        })
      })
    student.absence = absences;
    return student;
  })
  return Promise.all(attendants);
}

function getAbsences(absentees) {
  return absentees.flatMap((absentee) => {
    return absentee.absence.map((absence) => {
      const student = Object.assign({}, absentee);
      student.absence = absence;
      student.date = absence.date;
      delete student.absence.date;
      return student;
    })
  });
}

function removeDuplicate(absences) {
  return absences.filter((absence,index) => {
    return index === absences.findIndex(obj => {
      return JSON.stringify(obj) === JSON.stringify(absence);
    });
  });
}

async function getStudentsOf(teachersGroup) {
  const querySnapshot = await db.collection("groups").doc(teachersGroup.groupName).collection('students').get();
  let students = [];
  querySnapshot.forEach((student) => {
    students.push(student.data())
  });
  return students;
}

async function getGroup(groupName) {
  const querySnapshot = await db.collection("groups").where("groupName", "==", groupName).get();
  let groups = [];
  querySnapshot.forEach((doc) => {
    groups.push(doc.id)
  });
  return groups[0];
}