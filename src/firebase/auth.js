import { auth } from './firebase';

export async function checkUserClaim(customClaim) {
  const loggedInUser = auth.currentUser;
  if (loggedInUser) {
    const idTokenResult = await loggedInUser.getIdTokenResult();
    return idTokenResult.claims[customClaim];
  }
}

export async function signOut() {
  return auth.signOut();
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function getUserEmail() {
  return getCurrentUser().email;
}