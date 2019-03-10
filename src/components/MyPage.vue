<template>
  <div>
    <profileCard></profileCard>
    <div class="row">
      <div class="col"></div>
      <div class="col-4">
        <b-form-input size="lg" type="text" v-model="newProjectName"/>
      </div>
      <div class="col-3">
        <b-button variant="info" size="lg" @click="createProject(newProjectName)">add project</b-button>
      </div>
      <div class="col"></div>
    </div>
    <projects v-bind:projectsTable="myProjectsTable"></projects>
  </div>
</template>

<script>
import firebase from "../firebase";
import Projects from "./Projects.vue";
import ProfileCard from "./ProfileCard.vue";
import { mapActions, mapState } from "vuex";

let projectIDtoName_json = require("../assets/projects.json").projectIDtoName;
let emptyProject = require("../assets/emptyProject.json");
export default {
  components: {
    profileCard: ProfileCard,
    projects: Projects
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
  },
  computed: {
    ...mapState(["projectsTable", "userId"]),
    myProjectsTable() {
      let myProjectsTable = {};
      for (var key in this.projectsTable) {
        // skip loop if the property is from prototype
        if (!this.projectsTable.hasOwnProperty(key)) continue;

        var project = this.projectsTable[key];
        for (var prop in project) {
          // skip loop if the property is from prototype
          if (!project.hasOwnProperty(prop)) continue;

          // your code
          if (project.owner == this.userId) {
            myProjectsTable[key] = project;
          }
        }
      }
      return myProjectsTable
    }
  }
};
</script>