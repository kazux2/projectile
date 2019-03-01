// users/{document}にuser一意の情報としてemailを与えるスクリプト。

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
exports.registerUser = functions.auth.user().onCreate((user) => {
    const docRef = db.collection('users').doc(user.uid);
    docRef.set({
        username: user.email,
        nickname: "Joe Taro Yamada",
        summery: "I am that kinda human",
        image: "http://placekitten.com/150/150"
    }); // とりあえずの実装としてemailaddressをusernameとして扱う。（）
});
