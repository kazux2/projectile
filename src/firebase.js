import firebase from '@firebase/app';
// import '@firebase/auth';
import store from './store';
let emptyProject = require("./assets/emptyProject.json");

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
    createProject(name) {
        const projectRef = this.db.collection("projects");
        const projectsTableRef = this.db.collection("projectsTable");
       
        emptyProject.name = name;
        emptyProject.owner = store.state.user.username; //ここemail(username)からidにかえた方がいい?
        // projectRef.add(Object.assign({}, emptyProject))
        projectRef.add(emptyProject)
        .then(docRef => {
            projectsTableRef.doc(docRef.id).set({ name: name });
        });
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