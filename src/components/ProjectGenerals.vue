<template>
  <div>
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
      <div class="row">
        <div id="project-summery">
          <h1>プロジェクト概要</h1>
          <p><editable v-bind:value="project.overview" /></p>
        </div>
      </div>
      <div class="row">
        <button v-if="!isEditing" @click="isEditing = true">Edit</button>
        <button v-if="isEditing" @click="isEditing = false;">Cancel editing</button>
        <button v-if="isEditing" @click="updateProject({image: selectedImageRaw, name:name, overview: overview}); isEditing = false">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import Editable from './Editable.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    'editable': Editable
  },
  data() {
    return {
      d: null,
      name: null,
      newEventDate: null,
      newEventContent: null,
      isEditing: false
    };
  },
  created() {
    this.fetchProject(this.$route.params.id)
  },
  computed: mapState(['project']),
  methods: {
    addEvent(){
      firebase.db.collection("projects").doc(this.$route.params.id)
      .update({
        events: firebase.firestore.FieldValue.arrayUnion({content:this.newEventContent, date:this.newEventDate})
      })

    },
    ...mapActions(['fetchProject', 'updateProject'])
  }
};
</script>