<template>
  <div>
    <projectGenerals></projectGenerals>
    <div class="container">
      <div class="row">
        <input type="date" v-model="newEventDate">
        <input type="text" v-model="newEventContent">
        <button @click="addEvent">イベントを追加</button>
      </div>
      <div class="event" v-for="(event, index) in project.events" :key="index">
        <h1>{{ event.date }}</h1>
        <p>{{ event.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import Editable from "./Editable.vue";
import { mapState, mapActions } from "vuex";
import ProjectGenerals from './ProjectGenerals.vue';

export default {
  components: {
    projectGenerals: ProjectGenerals
  },
  data() {
    return {
      d: null,
      name: null,
      newEventDate: null,
      newEventContent: null
    };
  },
  created() {
    this.fetchProject(this.$route.params.id);
  },
  computed: mapState(["project"]),
  methods: {
    addEvent() {
      firebase.db
        .collection("projects")
        .doc(this.$route.params.id)
        .update({
          events: firebase.firestore.FieldValue.arrayUnion({
            content: this.newEventContent,
            date: this.newEventDate
          })
        });
    },
    ...mapActions(["fetchProject"])
  }
};
</script>