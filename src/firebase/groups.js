import { db } from './firebase';
import { checkUserClaim } from './auth';

export async function getGroups() {
  const querySnapshot = await db.collection("schools").doc("alhimmah").collection("groups").get();
  let groups = [];
  querySnapshot.forEach((doc) => {
    groups.push(doc.data());
  });
  return groups;
}

export async function createGroup(group) {
  const userIsModerator = await checkUserClaim('moderator');
  if (!userIsModerator) {
    return new Error('User not authorized.');
  }
  return db.collection("schools").doc("alhimmah").collection("groups").doc(group.groupName).set(group)
    .then(()=> {
      return {success: true};
    })
    .catch((error)=> {
      throw new Error(error);
    });
}