<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <uploadableImage v-bind:value="uploadableImageData" v-on:imageSelected="rowImage"/>
        <!-- <img :src="project.heroImage" class="img-fluid rounded" id="hero-image" alt="Responsive image"> -->
      </div>
      <div class="col">
        <div id="project-attributes">
          <h1 v-if="!isEditing">{{project.name}}</h1>
          <input v-if="isEditing" type="text" v-model="projectNameBufferComputed">
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
    <div class="row">
      <div id="project-summery">
        <h1>プロジェクト概要</h1>
        <p v-if="!isEditing">{{project.overview}}</p>
        <textarea v-if="isEditing" type="text" v-model="overviewBufferComputed"></textarea>
      </div>
    </div>
    <div class="row">
      <button v-if="!isEditing" @click="isEditing = true">Edit</button>
      <button v-if="isEditing" @click="isEditing = false;">Cancel editing</button>
      <button
        v-if="isEditing"
        @click="updateProject({image: selectedImageRaw, name:project.name, overview: project.overview}); isEditing = false"
      >Save</button>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import Editable from "./Editable.vue";
import { mapState, mapActions } from "vuex";
import UploadableImageVue from "./UploadableImage.vue";

export default {
  components: {
    editable: Editable,
    uploadableImage: UploadableImageVue
  },
  data() {
    return {
      d: null,
      src: "initialSrc",
      name: null,
      overviewBuffer: "",
      projectNameBuffer: "",
      newEventDate: null,
      newEventContent: null,
      selectedImageRaw: "initialselectedImageRawfromProjectGenerals",
      isEditing: false
    };
  },
  mounted: function() {
    this.src = this.project.heroImage;
  },
  created() {
    this.fetchProject(this.$route.params.id);
  },
  computed: {
    projectNameBufferComputed: {
      get: function() {
        this.projectNameBuffer = this.$store.state.project.name;
        return this.projectNameBuffer;
      },
      set: function(newValue) {
        this.overviewBuffer = newValue;
        this.$store.commit("syncProjectOverview", newValue);
      }
    },
    overviewBufferComputed: {
      get: function() {
        this.overviewBuffer = this.$store.state.project.overview;
        return this.overviewBuffer;
      },
      set: function(newValue) {
        this.overviewBuffer = newValue;
        this.$store.commit("syncProjectOverview", newValue);
      }
    },
    uploadableImageData() {
      return {
        src: this.project.heroImage,
        isEditing: this.isEditing,
        selectedImageRaw: this.selectedImageRaw
      };
    },
    ...mapState(["project"])
  },
  methods: {
    rowImage(arg) {
      this.selectedImageRaw = arg.selectedImageRaw;
    },
    ...mapActions(["fetchProject", "updateProject"])
  }
};
</script>