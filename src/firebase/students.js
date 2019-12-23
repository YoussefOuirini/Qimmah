import { db, getStudentDocName, getGroups} from './firebase';
import { checkUserClaim } from './auth';

export async function deleteStudent(student) {
  const studentDocName = getStudentDocName(student);
  await db.collection('registrations').doc(studentDocName).delete();
  const allGroups = await getGroups();
  await removeStudentFromGroups(student, allGroups);
}

export async function removeStudentFromGroups(student, groups) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.');
  }
  const studentDocName = getStudentDocName(student);
  groups.forEach((group) => {
    db.collection('groups').doc(group.groupName).collection('students').doc(studentDocName).delete()
      .catch((error) => {
        return new Error("Error removing document: ", error);
      });
  });
}