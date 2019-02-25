<template>
  <div>
    <hr>
    <div class="container-fluid">
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

      <!-- <div class="row">
        <input type="text" v-model="newProjectName">
        <button @click="createProject">add project</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import firebase from "../firebase" 
let projectIDtoName_json = require("../assets/projects.json").projectIDtoName;
let emptyProject = require("../assets/emptyProject.json");

import { mapState } from 'vuex';

import store from '../store.js';
export default {
  computed: mapState(['user', 'projects']),
  methods: {
    // createProject() {
    //   const projectRef = db.collection("projects");
    //   const projectsTableRef = db.collection("projectsTable");
    //   emptyProject.owner = this.email;
    //   emptyProject.name = this.newProjectName;
    //   projectRef.add(emptyProject).then(docRef => {
    //     projectsTableRef.doc(docRef.id).set({ name: this.newProjectName });
    //   });
    // },
    logOut() {
      firebase.logOut();
    },
    logIn() {
      firebase.logIn();
    }
  }
};
</script>