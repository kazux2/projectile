<template>
  <div>
    <profileCard></profileCard>
    <div class="row">
      <div class="col"></div>
      <div class="col-4">
        <b-form-input size="lg" type="text" v-model="newProjectName"/>
      </div>
      <div class="col-3">
        <b-button variant="info"  size="lg" @click="createProject(newProjectName)">add project</b-button>
      </div>
      <div class="col"></div>
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