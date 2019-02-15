// import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
exports.sendWelcomeEmail = functions.auth.user().onCreate((user: any) => {
    const docRef = db.collection('users').doc(user.uid);
    docRef.set({username: user.email}); // とりあえずの実装としてemailaddressをusernameとして扱う。（ユーザーごとに一意のユーザーネームを持たせるとなると、バリデーションのためのusernamesコレクションを管理しなくてはいけなくなる）
});
