import { db, getStudentsOf, getStudentDocName } from './firebase';
import { getLessonDate } from "../common/date";

export async function storeAbsence(absenCall, registration) {
  const lessonsDate = getLessonDate(absenCall.timestamp);
  const studentDocName = getStudentDocName(registration);
  return db.collection("groups").doc(registration.group).collection('students').doc(studentDocName)
    .collection('lessons').doc(lessonsDate).set(absenCall, {merge: true});
}

export async function getAbsence(student) {
  const lessonsDate = getLessonDate();
  const studentDocName = getStudentDocName(student);
  const absenceRef = db.collection("groups").doc(student.group).collection('students').doc(studentDocName).collection('lessons').doc(lessonsDate);
  return absenceRef.get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    }
  }).catch((error) => {
    return error;
  });
}

export async function getAllAbsentees() {
  const groupsIDs = await getGroupsIDs();
  const groupsStudents = await getAllStudents(groupsIDs);
  const filteredGroupsStudents = groupsStudents.filter(groupStudent => groupStudent.length).flat();
  const attendants = await getAbsentStudents(filteredGroupsStudents);
  const absentees = attendants.filter((attendant) => attendant.absences.length);
  const absences = getAbsences(absentees);
  return removeDuplicate(absences);
}

async function getGroupsIDs() {
  let groupsIDs = [];
  await db.collection("groups").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      groupsIDs.push(doc.id);
    });
  });
  return groupsIDs;
}

async function getAllStudents(groupsIDs) {
  const studentsGroups = await groupsIDs.map(async (groupID) => {
    return await getStudentsOf({groupName: groupID});
  });
  return Promise.all(studentsGroups);
}

async function getAbsentStudents(groupStudents) {
  const absentStudentLessons  = await getStudentLessons(groupStudents, "presence", "afwezig");
  const unkownReasonAbsentLessons  = await getStudentLessons(groupStudents, "absence.reason", "overige");
  const sickStudentLessons = await getStudentLessons(groupStudents, "absence.reason", "ziekte");
  return absentStudentLessons.concat(unkownReasonAbsentLessons).concat(sickStudentLessons);
}

async function getStudentLessons(groupsStudents, field, value) {
  const attendants = await groupsStudents.map(async (groupsStudent) => {
    const student = Object.assign({}, groupsStudent);
    const studentDocName = getStudentDocName(groupsStudent);
    let absences = [];
    await db.collection("groups").doc(groupsStudent.group).collection("students").doc(studentDocName).collection("lessons")
      .where(field, "==", value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const absence = doc.data();
          absence.date = checkDate(absence);
          absences.push(absence);
        });
      });
    student.absences = absences;
    return student;
  });
  return Promise.all(attendants);
}

function checkDate(absence) {
  if (absence.date) {
    return absence.date;
  }
  return getLessonDate(absence.timestamp);
}

function getAbsences(absentees) {
  return absentees.flatMap((absentee) => {
    return absentee.absences.map((absence) => {
      const student = Object.assign({}, absentee);
      student.absence = absence;
      student.date = absence.date;
      delete student.absence.date;
      return student;
    });
  });
}

function removeDuplicate(absences) {
  return absences.filter((absence,index) => {
    return index === absences.findIndex(obj => {
      return JSON.stringify(obj) === JSON.stringify(absence);
    });
  });
}