import { db, getStudentDocName } from './firebase';
import { checkUserClaim, getUserEmail } from './auth';

export async function getUsersRegistrations() {
  const querySnapshot = await db.collection("registrations").where("email", "==", getUserEmail()).get();
  let registrations = [];
  querySnapshot.forEach((doc) => {
    registrations.push(doc.data());
  });
  return registrations;
}

export async function getAllRegistrations() {
  const querySnapshot = await db.collection("registrations").get();
  let registrations = [];
  querySnapshot.forEach((doc) => {
    registrations.push(doc.data());
  });
  return registrations;
}

export async function writeRegistration(registration) {
  const studentDocName = getStudentDocName(registration);
  return db.collection("registrations").doc(studentDocName).set(registration)
    .then(()=> {
      return {success: true};
    })
    .catch((error)=> {
      throw new Error(error);
    });
}

export async function updateRegistration(registration, groupName) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.');
  }
  const studentDocName = getStudentDocName(registration);
  const registrationRef = db.collection("registrations").doc(studentDocName);
  return registrationRef.update({
    group: groupName
  }).then(() => {
    return {success: true};
  }).catch((error) => {
    return new Error('Error updating document: ', error);
  });
}