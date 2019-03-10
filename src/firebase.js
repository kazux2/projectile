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
    fetchEvents(id){
        return this.db.collection("projects").doc(id).collection("events").orderBy("date", "desc").get()
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
    addEvent(projectId, date, content){
        const projectRef = this.db
          .collection("projects")
          .doc(projectId).collection("events").doc(date.toString())

        return projectRef.set({
            owner: store.state.userId, //firestoreのルールで、subcollectionでのバリデーションの仕方がわからないので、親collectionの構造に合わせる。
            date: date,
            content: content
          });

    },
    updateEvent(projectId, eventId, content){
        const projectRef = this.db
          .collection("projects")
          .doc(projectId).collection("events").doc(eventId.toString())

        return projectRef.set({
            owner: store.state.userId,
            date: eventId,
            content: content
          });
    },
    storageRef: firebase.storage().ref(),
    uploadProfileImage(file) {
        //関数名でfirestoreなのかfirebase storageなのかわからん問題ある
        let extension = file.name.split('.').pop()
        return this.storageRef
        .child(`${store.state.userId}/userProfile/profile.${extension}`) //拡張子対応
        .put(file)
    },
    uploadProjectImage(file){
        let extension = file.name.split('.').pop()
        return this.storageRef
        .child(`${store.state.userId}/projects/${store.state.projectID}/heroImage.${extension}`)
        .put(file)
    }
};