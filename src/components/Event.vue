<template>
  <div id="event">
    <div class="row">
      <div class="col">
        <h1>{{ convertTimestampToDate(value.eventDate) }}</h1>
      </div>
    </div>

    <div class="row">
      <div class="col"  v-if="project.owner != userId">
        <p>{{ value.eventContent }}</p>
      </div>

      <div class="col"  v-if="project.owner == userId">
        <p v-if="!isEditingEventContent" v-on:click="isEditingEventContent = true">{{ value.eventContent }}</p>
        <b-form-textarea
          v-if="isEditingEventContent" 
          v-model="contentBuffer"
          placeholder="イベントの内容"
          rows="6"
          max-rows="6"
        />
      </div>
    </div>
    <b-container>
      <b-row align-h="end">
        <b-button
          class="float-right"
          variant="warning"
          v-if="isEditingEventContent"
          @click="isEditingEventContent = false"
          >Cancel editing</b-button>
        <b-button
          class="float-right"
          variant="info"
          v-if="isEditingEventContent"
          @click="updateEvent({projectId: projectId, eventId: dateBuffer, content: contentBuffer}); isEditingEventContent = false"
        >Save</b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState, mapActions } from "vuex";
import UploadableImageVue from "./UploadableImage.vue";

export default {
  components: {
    uploadableImage: UploadableImageVue
  },
  data() {
    return {
      date:"",
      content:"",
      dateBuffer: "",
      contentBuffer: "",
      selectedImageRaw: "initialselectedImageRawfromProjectGenerals",
      isEditingEventContent: false,
      projectId: ""
    };
  },
  created() {
      this.projectId = this.value.projectId;
      this.dateBuffer = this.value.eventDate;
      this.contentBuffer = this.value.eventContent;
  },
  props: ["value"],
  watch: {
    value() {
      this.dateBuffer = this.value.eventDate;
      this.contentBuffer = this.value.eventContent;
    }
  },
  computed: {
    // contentBufferComputed: {
    //   get: function() {
    //     this.contentBuffer = this.$store.state.event[x].content;
    //     return this.contentBuffer;
    //   }
    // },
    ...mapState(["project", "userId"])
  },
  methods: {
    convertTimestampToDate(arg) {
      let dt = new Date(arg)
      let formattedDateString = `${dt.getFullYear()}年 ${dt.getMonth()+1}月 ${dt.getDate()}日 ${dt.getHours()}時 ${dt.getMinutes()}分`
      return formattedDateString 
    },
    ...mapActions(["updateEvent"])
  }
};
</script>