import firebase from '@firebase/app';
import '@firebase/auth';
import store from './store';

const config = {
    apiKey: "AIzaSyD06aXivg20aWiJay3G0HrPsW1ATCX47Y0",
    authDomain: "auth-app-4a17b.firebaseapp.com",
    databaseURL: "https://auth-app-4a17b.firebaseio.com",
    projectId: "auth-app-4a17b",
    storageBucket: "auth-app-4a17b.appspot.com",
    messagingSenderId: "711844858311"
};
firebase.initializeApp(config);

export default {
    db: firebase.firestore(),
    init() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    },
    logIn() {
        // const provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithPopup(provider);
        this.$router.push('/auth')
    },
    logOut() {
        firebase.auth().signOut();
    },
    // onAuth() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         this.db.collection("users")
    //             .doc(user.uid)
    //             .onSnapshot(doc => {
    //                 store.storeUser(doc.data())
    //             })
    //         this.db.collection("projectsTable")
    //             .get().then(docs => {
    //                 var projects = [];
    //                 docs.forEach(doc => {
    //                     projects.push(doc.data());
    //                 });
    //                 store.storeProjects(projects)
    //             })
    //     });
    // },
    onAuth() {
      firebase.auth().onAuthStateChanged(user => {
        this.db.collection("users")
        .doc(user.uid)
        .get().then(doc => {
            store.commit('syncUser', doc.data());
        })

        this.db.collection("projectsTable")
        .get().then(docs => {
            var projects = [];
            docs.forEach(doc => {
                projects.push(doc.data());
            });
            store.commit("syncProjects", projects)
        })
      });
    }
};