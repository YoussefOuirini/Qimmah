import { getStudentDocName, db, userIs, getCurrentUser } from "./firebase";
import { getLessonDate, getTimeStamp } from "../common/date";

export async function getLessonsOf(student) {
  const studentDocName = getStudentDocName(student);
  if (!student.group) return;
  const querySnapshot = await db.collection('groups').doc(student.group).collection('students').doc(studentDocName).collection('lessons').get();
  let lessons = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    lessons.push(data);
  });
  return lessons;
}

export async function getDateLessons(date, students) {
  const studentsDateLessons = students.map(async(student) => {
    return await getStudentDateLesson(date, student);
  });
  return Promise.all(studentsDateLessons);
}

export async function writeLessons(lessons) {
  const teacher = getCurrentUser();
  const userIsTeacher = await userIs(teacher);
  if (!userIsTeacher) {
    return new Error('User not authorized.');
  }
  const batch = db.batch();
  lessons.forEach((studentGroupLesson) => {
    const {student, groupName, lesson} = studentGroupLesson;
    const studentDocName = getStudentDocName(student);
    const lessonTimeStamp = getTimeStamp(lesson.date);
    const lessonDate = getLessonDate(lessonTimeStamp);
    const lessonRef = db.collection("groups").doc(groupName).collection('students').doc(studentDocName).collection('lessons').doc(lessonDate);
    batch.set(lessonRef, lesson, {merge: true});
  });
  return batch.commit().then(()=> {
    return {success: true};
  })
  .catch((error)=> {
    throw new Error(error);
  });
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