const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sendgridMail = require("@sendgrid/mail");
sendgridMail.setApiKey(functions.config().sendgrid.apikey);

admin.initializeApp();

exports.getAllUsers = functions.https.onCall((data, context) => {
  if (context.auth.token.moderator) {
    return getUsers();
  }
  return {error: 'User not authorized to view all users.'}
});

exports.addModerator = functions.https.onCall((data, context) => {
   if (context.auth.token.moderator) {
     return setUserRole(data.email, data.role)
   }
   return { error: 'User not authorized to change user role.'}
})

exports.sendEmail = functions.https.onCall((data, context) => {
  if (context.auth.token.teacher || context.auth.token.moderator) {
    const { toEmail, subject, text, html } = data;
    const msg = {
      to: toEmail,
      from: 'qimmah@himmah.com',
      subject: subject,
      text: text,
      html: html,
    };
    return sendgridMail.send(msg);
  }
  return { error: 'User not authorized to change user role.'}
})

async function getUsers() {
  const usersResult = await admin.auth().listUsers();
  return usersResult.users;
}

async function setUserRole(email, role) {
  const user = await admin.auth().getUserByEmail(email);
  return admin.auth().setCustomUserClaims(user.uid, role);
}