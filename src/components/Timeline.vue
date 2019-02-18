<template>
  <div>
    <h1>Signup succeeded</h1>
    <button @click="logOut">Log out</button>
    <hr>
    <p>{{displayName}}</p>
    <div class="container-fluid">
      <div class="row">
        <div v-for="(value, key, index) in projectIDtoName" :key="index">
          <ul>
            <router-link tag="li" v-bind:to="{name:'Project', params : {id: key}}">
              <li>
                <a>{{ value }}</a>
              </li>
            </router-link>
          </ul>
        </div>
      </div>

      <div v-for="(value, key, index) in projects" :key="index">
        <ul>
          <div class="row">
            <router-link tag="li" v-bind:to="{name:'Project', params : {id: key}}">
              <li>
                <a>{{ value.name }}</a>
              </li>
            </router-link>
          </div>
        </ul>
      </div>

      <div class="row">
        <input type="text" v-model="newProjectName">
        <button @click="createProject">add project</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../helpers/firebaseInit";
let projectIDtoName_json = require("../assets/projects.json").projectIDtoName;
let emptyProject = require("../assets/emptyProject.json");
export default {
  data() {
    return {
      email: "",
      displayName: "",
      projectIDtoName: projectIDtoName_json,
      emptyProject: emptyProject,
      newProjectName: "",
      projects: {},
      querySnapshot: ""
    };
  },
  created() {
    let vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.displayName = user.displayName;
        vm.email = user.email;
        vm.uid = user.uid;
      }
      db.collection("projectsTable")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            vm.$set(vm.projects, doc.id, doc.data());
          });
        });
    });
  },
  methods: {
    createProject() {
      const projectRef = db.collection("projects");
      const projectsTableRef = db.collection("projectsTable");
      emptyProject.owner = this.email;
      emptyProject.name = this.newProjectName;
      projectRef.add(emptyProject).then(docRef => {
        projectsTableRef.doc(docRef.id).set({ name: this.newProjectName });
      });
    },
    logOut() {
      firebase.auth().signOut();
    }
  }
};
</script>