<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-6">
        <img :src="hero-image" class="img-fluid rounded" id="hero-image" alt="Responsive image">
      </div>
      <div class="col">
        <div id="project-attributes">
          <h1>{{ projectName }}</h1>
          <div id="member">
            <h2>Member</h2>
            <ul>
              <li v-for="member in members" :key="member">{{ member }}</li>
            </ul>
          </div>
          <div id="resources">
            <h2>Resources</h2>
            <ul>
              <li v-for="(resourceURL, resourceName) in resources" :key="resourceName">
                <a href="resources">{{ resourceName }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="project-summery">
      <h1>プロジェクト概要</h1>
      <p>{{ projectDescription }}</p>
    </div>
    <!-- <div class="event" v-for="event in events" :key="event">
            <h1>{{ event.date }}</h1>
                <p>{{ event.content }}</p>
    </div>-->
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: "",
      projectName: "",
      members: [],
      resources:[],
      projectDescription: "",
      events: []
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