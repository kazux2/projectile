<template>
  <div>
    <div class="row">
      <!-- <div class="col-6">
          <uploadableImage v-bind:value="uploadableImageData" v-on:imageSelected="rowImage"/>
      </div>-->
      <div class="col">
        <h1 v-if="!isEditing">{{ convertTimestampToDate(value.date) }}</h1>
        <input v-if="isEditing" type="date" v-model="dateBufferComputed">

        <p v-if="!isEditing">{{ value.content }}</p>
        <textarea v-if="isEditing" type="text" v-model="contentBufferComputed"></textarea>
      </div>
    </div>
    <!-- <div class="row">
      <button v-if="!isEditing" @click="isEditing = true">Edit</button>
      <button v-if="isEditing" @click="isEditing = false;">Cancel editing</button>
      <button v-if="isEditing" @click="updateProject({image: selectedImageRaw, name:project.name, overview: project.overview}); isEditing = false">Save</button>
    </div> -->
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
      isEditing: false
    };
  },
  props: ["value"],
  watch: {
    value() {
      console.log("Event value changed: ", this.value)
      this.date = this.value.date;
      this.contnet = this.value.content;
    }
  },
  computed: {
    dateBufferComputed: {
      get: function() {
        this.dateBuffer = this.$store.state.project.event;
        return this.dateBuffer;
      },
      set: function(newValue) {
        this.overviewBuffer = newValue;
        this.$store.commit("syncProjectEventDate", newValue);
      }
    },
    contentBufferComputed: {
      get: function() {
        this.overviewBuffer = this.$store.state.project.overview;
        return this.overviewBuffer;
      },
      set: function(newValue) {
        this.overviewBuffer = newValue;
        this.$store.commit("syncProjectEventContent", newValue);
      }
    },
    // uploadableImageData() {
    //   return {
    //     src: this.project.heroImage,
    //     isEditing: this.isEditing,
    //     selectedImageRaw: this.selectedImageRaw
    //   };
    // },
  },
  methods: {
    convertTimestampToDate(arg) {
      let dt = new Date(arg)
      let formattedDateString = `${dt.getFullYear()}年 ${dt.getMonth()+1}月 ${dt.getDate()}日 ${dt.getHours()}時 ${dt.getMinutes()}分`
      return formattedDateString 
    }
  }
};
</script>