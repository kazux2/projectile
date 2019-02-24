<template>
  <div class="container">
  <div class="row">
    <div class="col-sm-4">
      <img v-if="!selectedImage" class="rounded-circle" :src="user.image" alt="">
      <img v-if="selectedImage" class="rounded-circle" :src="selectedImage" />
      <input v-if="isEditing" class="" type="file" v-on:change="onFileChange">
    </div>
    

    <div class="col-sm-8">
      <div class="row">
        <h1 v-if="!isEditing">{{user.nickname}}</h1>
        <h1><input v-if="isEditing" type="text" v-model="nicknameBufferComputed"></h1>
      </div>
      <div class="row"> 
        <p v-if="!isEditing">{{user.summery}}</p>
        <textarea v-if="isEditing" type="text" v-model="summeryBufferComputed"></textarea>
      </div>
      <div class="row">
        <button v-if="!isEditing" @click="isEditing = true">Edit profile</button>
        <button v-if="isEditing" @click="isEditing = false;">Cancel editing</button>
        <button v-if="isEditing" @click="updateUserProfile({image: selectedImageRaw, nickname:nicknameBuffer, summery: summeryBuffer}); isEditing = false">Save</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Editable from './Editable.vue';
import firebase from '../firebase';
export default {
  components: {
    'editable': Editable
  },
  data(){
    return {
      nicknameBuffer: "",
      summeryBuffer:"",
      selectedImage: '',
      selectedImageRaw:'',
      isEditing: false
    }
  },
  methods: {
    uploadImage(){
      firebase.uploadProfileImage(this.selectedImageRaw)
    },
    onFileChange(e) {
      // 選択したファイルをいい感じに表示するメソッド https://qiita.com/komatzz/items/f2a25db16aca388845d3
      let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      this.selectedImageRaw = file
      // 選択したファイルをいい感じに表示するメソッド 続き
      let reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    ...mapActions(['updateUserProfile']),
  },
  computed: {
    nicknameBufferComputed: {
      get: function () {
        this.nicknameBuffer = this.$store.state.user.nickname
        return this.nicknameBuffer
      },
      set: function (newValue) {
        this.nicknameBuffer = newValue
        this.$store.commit('syncUserNickname', newValue)
      }
    },
    summeryBufferComputed: {
      get: function () {
        this.summeryBuffer = this.$store.state.user.summery
        return this.summeryBuffer
      },
      set: function (newValue) {
        this.summeryBuffer = newValue
        this.$store.commit('syncUserSummery', newValue)
      }
    },
    ...mapState(['user', 'projects'])
  }
};
</script>