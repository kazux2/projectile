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
        this.$router.push('/auth')
    },
    logOut() {
        firebase.auth().signOut();
    },
    onAuth() {
        // これstore.jsに移動したい
        firebase.auth().onAuthStateChanged(user => {
            store.commit('storeUserId', user.uid);
            this.db.collection("users")
                .doc(user.uid)
                .get().then(doc => {
                    store.commit('syncUser', doc.data());
                })

            this.db.collection("projectsTable")
                .get().then(docs => {
                    var projects = {};
                    docs.forEach(doc => {
                        projects[doc.id] = doc.data();
                    });
                    store.commit("syncProjects", projects)
                })
        });
    },
    fetchProject(id){
        return this.db.collection("projects").doc(id).get()
    },
    updateUserProfile(userId, imgURL, nickname, summery) {
        return this.db.collection("users").doc(userId)
            .update({
                image: imgURL,
                nickname: nickname,
                summery: summery
            })
    },
    updateProject(projectId, imgURL, name, overview){
        return this.db.collection("projects").doc(projectId)
            .update({
                heroImage: imgURL,
                name: name,
                overview: overview
            })
    },
    storageRef: firebase.storage().ref(),
    uploadProfileImage(file) {
        //関数名でfirestoreなのかfirebase storageなのかわからん問題ある
        var profileRef = this.storageRef.child(`${store.state.userId}/profile.png`); //拡張子対応
        profileRef.put(file)
        return profileRef.getDownloadURL()
    },
    uploadProjectImage(file){
        console.log("uploading file: ", file)
        var profileRef = this.storageRef.child(`${store.state.userId}/project/heroImage.png`); //拡張子対応
        profileRef.put(file)
        return profileRef.getDownloadURL()
    }
};