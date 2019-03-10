<template>
  <div id="project-generals">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <uploadableImage v-bind:value="uploadableImageData" v-on:imageSelected="rowImage"/>
          <!-- <img :src="project.heroImage" class="img-fluid rounded" id="hero-image" alt="Responsive image"> -->
        </div>
        <div id="project-name" class="col">
          <h1 v-if="!isEditing">{{project.name}}</h1>
          <b-form-input size="lg" v-if="isEditing" type="text" v-model="projectNameBufferComputed"/>
          <div id="project-attributes">
            <h2>Members</h2>
            <ul>
              <li v-for="member in project.members" :key="member">{{ member }}</li>
              <li>some one</li>
              <li>dare ka</li>
              <li>tomoda chi</li>
            </ul>
            <h2>Resources</h2>
            <ul>
              <li v-for="(value, key, index) in project.resources" :key="index">
                <a :href="value">{{ key }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div id="project-overview">
          <h2>プロジェクト概要</h2>
          <p v-if="!isEditing">{{project.overview}}</p>
        </div>
      </div>

      <b-row class="my-1">
      <b-col>
        <b-form-textarea v-if="isEditing" type="text" v-model="overviewBufferComputed" rows="6"/>
      </b-col>
      </b-row>

      <b-container>
        <b-row align-h="end">
          <!-- <b-col cols="4"> -->
          <b-button
            class="float-right"
            variant="secondary"
            v-if="!isEditing && project.owner == userId"
            @click="isEditing = true"
          >Edit</b-button>

          <b-button
            class="float-right"
            variant="warning"
            v-if="isEditing"
            @click="isEditing = false;"
          >Cancel editing</b-button>
          <b-button
            class="float-right"
            variant="info"
            v-if="isEditing"
            @click="updateProject({image: selectedImageRaw, name:project.name, overview: project.overview}); isEditing = false"
          >Save</b-button>

          <!-- </b-col> -->
        </b-row>
      </b-container>
{{selectedImageRaw}}
      <!-- <b-container>
        <b-row align-h="center">
          <b-button
            class="float-right"
            variant="danger"
            size="lg"
            v-if="isEditing"
            @click=""
          >Delete Project</b-button>
        </b-row>
      </b-container> -->
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
      selectedImageRaw: null,
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
        this.projectNameBuffer = newValue;
        this.$store.commit("syncProjectName", newValue);
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
    ...mapState(["project", "userId"])
  },
  methods: {
    rowImage(arg) {
      this.selectedImageRaw = arg.selectedImageRaw;
    },
    ...mapActions(["fetchProject", "updateProject"])
  }
};
</script>