import { db, getStudentDocName } from './firebase';

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