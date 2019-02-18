<template>
  <div id="app" class="container">{{d}}
    <!-- <div class="row">
      <div class="col-6">
        <img :src="d.heroImage" class="img-fluid rounded" id="hero-image" alt="Responsive image">
      </div>
      <div class="col">
        <div id="project-attributes">
          <h1><editable v-bind:value="d.name" /></h1>
          <div id="member">
            <h2>Member</h2>
            <ul>
              <li v-for="member in d.members" :key="member">{{ member }}</li>
            </ul>
          </div>
          <div id="resources">
            <h2>Resources</h2>
            <ul>
              <li v-for="(value, key, index) in d.resources" :key="index">
                <a :href="value">{{ key }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="project-summery">
      <h1>プロジェクト概要</h1>
      <p><editable v-bind:value="d.overview" /></p>
    </div>
    <div class="event" v-for="event in d.events" :key="event">
            <h1>{{ event.date }}</h1>
                <p>{{ event.content }}</p>
    </div> -->
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../helpers/firebaseInit";
let projects = require( "../assets/projects.json" ).projects;
import Editable from './Editable.vue';

export default {
  components: {
    'editable': Editable
  },
  data() {
    return {
      p: projects[this.$route.params.id],
      d: null
    };
  },
  firestore(){
    d: db.collection("projects").doc("NSK1KmoGF7whLyQqO2UO")
  },
  created() {
    let vm = this;
    console.log(vm.d)
    // db.collection("projects").doc(this.$route.params.id)
    // .get().then(doc => {
    //   vm.d = doc.data()
    //   console.log(vm.d)
    // })
    // let firebaseDatabase = firebase.database();
    // firebase
    //   .database()
    //   .ref("project")
    //   .once("value")
    //   .then(function(snapshot) {
    //     let data = snapshot.val();
    //     if (data) {
    //       vm.projectName = data.name;
    //       vm.projectDescription = data.description;
    //     }
    //   });
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