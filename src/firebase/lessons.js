import { getUsersRegistrations, getStudentDocName, db } from "./firebase";
import { getLessonDate } from "../common/getDate";

export async function getLessons() {
  const registrations = await getUsersRegistrations();
  const studentLessons = registrations.map(async (registration) => {
    const studentDocName = getStudentDocName(registration);
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
    };
  });
  return Promise.all(studentLessons);
}

export async function getDateLessons(date, students) {
  const studentsDateLessons = students.map(async(student) => {
    return await getStudentDateLesson(date, student);
  });
  return Promise.all(studentsDateLessons);
}

async function getStudentDateLesson(date, student) {
  const studentDocName = getStudentDocName(student);
  const lessonDate = getLessonDate(date);
  const lessonDoc = await db.collection('groups').doc(student.group).collection('students').doc(studentDocName)
    .collection('lessons').doc(lessonDate).get();
  if (lessonDoc.exists) {
    return {student, lesson: lessonDoc.data()};
  } else {
    return {student, lesson: {}};
  }
}