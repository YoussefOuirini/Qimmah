import { db, firestore, checkUserClaim } from './firebase';

export async function updateGroupTeacher(teacherEmail, groupName) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.');
  }
  const group = await getGroup(groupName);
  const groupRef = db.collection("groups").doc(group);
  return groupRef.update({
    teachers: firestore.FieldValue.arrayUnion(teacherEmail)
  });
}

export async function removeGroupTeacher(teacherEmail, groupName) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.');
  }
  const group = await getGroup(groupName);
  const groupRef = db.collection("groups").doc(group);
  return groupRef.update({
    teachers: firestore.FieldValue.arrayRemove(teacherEmail)
  });
}

export async function addToTeachers(user) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.');
  }
  const writeResponse = await db.collection("teachers").doc(user.email).set(user).then(() => {
    return { success: true};
  });
  return writeResponse;
}

// export async function userIs(teacher) {

// }

// export async function removeFromTeachers(user) {

// }

async function getGroup(groupName) {
  const querySnapshot = await db.collection("groups").where("groupName", "==", groupName).get();
  let groups = [];
  querySnapshot.forEach((doc) => {
    groups.push(doc.id);
  });
  return groups[0];
}