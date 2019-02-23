<template>
  <div>
    <profileCard></profileCard>
    <projects></projects>
    <div class="row">
      <input type="text" v-model="newProjectName">
      <button @click="createProject">add project</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Projects from './Projects.vue';
import ProfileCard from './ProfileCard.vue';

let projectIDtoName_json = require("../assets/projects.json").projectIDtoName;
let emptyProject = require("../assets/emptyProject.json");
export default {
  components: {
    'profileCard': ProfileCard,
    'projects': Projects
  },
  data() {
    return {
      isLoggedIn: false,
      email: "",
      displayName: "",
      projectIDtoName: projectIDtoName_json,
      emptyProject: emptyProject,
      newProjectName: "",
      projects: {},
      querySnapshot: ""
    };
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
    }
  }
};
</script>