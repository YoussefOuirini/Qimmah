import { db } from './firebase';

export async function getAllRegistrations() {
  const querySnapshot = await db.collection("registrations").get();
  let registrations = [];
  querySnapshot.forEach((doc) => {
    registrations.push(doc.data());
  });
  return registrations;
}