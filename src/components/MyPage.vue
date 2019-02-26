<template>
  <div>
    <profileCard></profileCard>
    <div class="row">
      <input type="text" v-model="newProjectName">
      <button @click="createProject(newProjectName)">add project</button>
    </div>
    <projects></projects>
  </div>
</template>

<script>
import firebase from "../firebase";
import Projects from './Projects.vue';
import ProfileCard from './ProfileCard.vue';
import { mapActions } from 'vuex';

let projectIDtoName_json = require("../assets/projects.json").projectIDtoName;
let emptyProject = require("../assets/emptyProject.json");
export default {
  components: {
    'profileCard': ProfileCard,
    'projects': Projects
  },
  data() {
    return {
      // ここら辺いらないはず
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
  ...mapActions(["createProject"])
  }
};
</script>