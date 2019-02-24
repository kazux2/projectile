<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <img :src="project.heroImage" class="img-fluid rounded" id="hero-image" alt="Responsive image">
      </div>
      <div class="col">
        <div id="project-attributes">
          <h1><editable v-bind:value="project.name"/></h1>
          <div id="member">
            <h2>Member</h2>
            <ul>
              <li v-for="member in project.members" :key="member">{{ member }}</li>
            </ul>
          </div>
          <div id="resources">
            <h2>Resources</h2>
            <ul>
              <li v-for="(value, key, index) in project.resources" :key="index">
                <a :href="value">{{ key }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="project-summery">
      <h1>プロジェクト概要</h1>
      <p><editable v-bind:value="project.overview" /></p>
    </div>
    <div class="row">
        <input type="date" v-model="newEventDate">
        <input type="text" v-model="newEventContent">
        <button @click="addEvent">イベントを追加</button>
      </div>
    <div class="event" v-for="event in project.events" :key="event">
            <h1>{{ event.date }}</h1>
                <p>{{ event.content }}</p>
    </div>
    <button @click="showStuff">showStuff</button>
  </div>
</template>

<script>
import firebase from "../firebase";
let db = firebase.db;
let projects = require( "../assets/projects.json" ).projects;
import Editable from './Editable.vue';

import { mapState, mapActions } from 'vuex';
export default {
  components: {
    'editable': Editable
  },
  data() {
    return {
      p: projects[this.$route.params.id],
      d: null,
      name: null,
      newEventDate: null,
      newEventContent: null,
    };
  },
  created() {
    this.fetchProject(this.$route.params.id)
    // let vm = this;
    // console.log(vm.d)
    // db.collection("projects").doc(this.$route.params.id)
    // .onSnapshot(doc => {
    //   vm.d = doc.data()
    //   this.name = vm.d.name
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
  computed: mapState(['project']),
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
    },
    showStuff() {
      console.log(this.name)
    },
    addEvent(){
      db.collection("projects").doc(this.$route.params.id)
      .update({
        events: firebase.firestore.FieldValue.arrayUnion({content:this.newEventContent, date:this.newEventDate})
      })

    },
    ...mapActions(['fetchProject'])
  }
};
</script>