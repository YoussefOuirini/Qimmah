const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.getAllUsers = functions.https.onCall((data, context) => {
  if (context.auth.token.moderator) {
    return getUsers();
  }
  return {error: 'User not authorized to view all users.'}
});

async function getUsers() {
  const usersResult = await admin.auth().listUsers();
  return usersResult.users;
}

exports.addModerator = functions.https.onCall((data, context) => {
   if (context.auth.token.moderator) {
     return setUserRole(data.email)
   }
   return { error: 'User not authorized to change user role.' }
})

async function setUserRole(email) {
  const user = await admin.auth().getUserByEmail(email);
  return admin.auth().setCustomUserClaims(user.uid, {moderator: true});
}