<template>
  <div>
    <div class="container-fluid">
      <div v-for="(value, key, index) in projects" :key="index">
        <ul>
          <div class="row">
              <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
                    <b-card-text>
                      <router-link tag="li" v-bind:to="{name:'Project', params : {id: key}}">
                        <li>
                          <a>{{ value.name }}</a>
                        </li>
                      </router-link>
                      Some quick example text to build on the card and make up the bulk of the card's content.
                    </b-card-text>
              </b-card>
            
          </div>
        </ul>
      </div>
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