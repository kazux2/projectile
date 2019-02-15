<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-6">
        <img :src="p.heroImage" class="img-fluid rounded" id="hero-image" alt="Responsive image">
      </div>
      <div class="col">
        <div id="project-attributes">
          <h1><editable v-bind:value="p.name.value" /></h1>
          <div id="member">
            <h2>Member</h2>
            <ul>
              <li v-for="member in p.members" :key="member">{{ member }}</li>
            </ul>
          </div>
          <div id="resources">
            <h2>Resources</h2>
            <ul>
              <li v-for="(value, key, index) in p.resources" :key="index">
                <a :href="value">{{ key }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="project-summery">
      <h1>プロジェクト概要</h1>
      <p>{{ p.overview }}</p>
    </div>
    <div class="event" v-for="event in p.events" :key="event">
            <h1>{{ event.date }}</h1>
                <p>{{ event.content }}</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
let projects = require( "../assets/projects.json" ).projects;
import Editable from './Editable.vue';

export default {
  components: {
    'editable': Editable
  } ,
  data() {
    return {
      p: projects[this.$route.params.id]
    };
  },
  created() {
    let vm = this;
    let firebaseDatabase = firebase.database();
    firebase
      .database()
      .ref("project")
      .once("value")
      .then(function(snapshot) {
        let data = snapshot.val();
        if (data) {
          vm.projectName = data.name;
          vm.projectDescription = data.description;
        }
      });
  },
  methods: {
    storeProjects() {
      // ↓ メッセージを Realtime Database に登録する処理
      firebase
        .database()
        .ref("project")
        .set({ name: this.projectName, description: this.projectDescription });
    },
    logOut() {
      firebase.auth().signOut();
    }
  }
};
</script>