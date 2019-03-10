<template>
  <div id="project">
    <projectGenerals></projectGenerals>
    <div class="container" v-if="project.owner == userId">
      <div class="row">
        <div class="col-6">
          Date: <b-form-input type="date" v-model="newEventDate"/>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          Time: <b-form-input type="time" v-model="newEventTime"/>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          Event:
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <b-form-textarea
            v-model="newEventContent"
            placeholder="イベントの内容"
            rows="6"
            max-rows="6"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <b-button
            v-if="newEventDate && newEventTime && newEventContent"
            @click="addEventWrapper();
            clearEvent()"
          >イベントを追加</b-button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="event" v-for="(eventObject, index) in events" :key="index">
        <event v-bind:value="{
          projectId: $route.params.id, 
          eventDate: eventObject.date, 
          eventContent: eventObject.content
          }"></event>
      </div>
    </div>
    
  </div>
</template>

<script>
import firebase from "../firebase";
import realfirebase from "firebase";
import Editable from "./Editable.vue";
import { mapState, mapActions } from "vuex";
import ProjectGenerals from "./ProjectGenerals.vue";
import EventVue from "./Event.vue";

export default {
  components: {
    projectGenerals: ProjectGenerals,
    event: EventVue
  },
  data() {
    return {
      d: null,
      name: null,
      newEventDate: null,
      newEventTime: null,
      newEventContent: null
    };
  },
  created() {
    this.fetchProject(this.$route.params.id);
    this.fetchEvents(this.$route.params.id);
    this.newEventDate = this.currentDate()
    this.newEventTime = this.currentTime()
  },
  computed: {
    date() {
      return new Date(this.newEventDate + " " + this.newEventTime).getTime();
    },
    ...mapState(["projectID", "project", "events", "userId"])
  },
  methods: {
    clearEvent(){
      this.newEventDate = this.currentDate()
      this.newEventTime = this.currentTime()
      this.newEventContent = ""
    },
    toTwoDigits(num, digit) {
      num += ''
      if (num.length < digit) {
        num = '0' + num
      }
      return num
    },
    currentDate(){
      var date = new Date()
      return `${date.getFullYear()}-${this.toTwoDigits(date.getMonth()+1, 2)}-${this.toTwoDigits(date.getDate(),2)}`
    },
    currentTime(){
      var date = new Date()
      return `${this.toTwoDigits(date.getHours(), 2)}:${this.toTwoDigits(date.getMinutes(),2)}`
    },
    addEventWrapper(){
      this.addEvent({projectId: this.$route.params.id, date: this.date, content: this.newEventContent})
      this.$forceUpdate();
    },
    ...mapActions(["fetchProject", "fetchEvents", "addEvent"])
  }
};
</script>