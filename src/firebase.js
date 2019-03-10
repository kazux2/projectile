import firebase from '@firebase/app';
// import '@firebase/auth';
import store from './store';
let emptyProject = require("./assets/emptyProject.json");

const config = {
    apiKey: "AIzaSyDS65F-RdU2wGpcg6UG5pgtrSKAQMqRdm4",
    authDomain: "projectile-d97c1.firebaseapp.com",
    databaseURL: "https://projectile-d97c1.firebaseio.com",
    projectId: "projectile-d97c1",
    storageBucket: "projectile-d97c1.appspot.com",
    messagingSenderId: "441182469013"
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
    createProject(name, created) {
        const projectRef = this.db.collection("projects");
       
        emptyProject.name = name;
        emptyProject.owner = store.state.userId;
        emptyProject.created = created;
        // projectRef.add(Object.assign({}, emptyProject))
        return projectRef.add(emptyProject)
        
    },
    setProjectInProjectsTable(docId, name, members, imageURL, time) {
        if(!imageURL){
            imageURL = "https://placekitten.com/300/300"
        }
        const projectsTableRef = this.db.collection("projectsTable");
        return projectsTableRef.doc(docId)
        .set({
            name: name,
            owner: store.state.userId,
            members: [],
            imageURL: imageURL,
            updated: time
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