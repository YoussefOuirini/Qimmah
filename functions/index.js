const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.getAllUsers = functions.https.onCall((data) => {
  return getUsers();
});

async function getUsers() {
  const usersResult = await admin.auth().listUsers();
  return usersResult.users;
}