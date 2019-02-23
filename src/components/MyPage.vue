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
  created() {
    let vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.isLoggedIn = true;
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
    }
  }
};
</script>