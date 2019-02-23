<template>
  <div class="container">
  <div class="row">
    <img class="col-sm-4 rounded-circle" :src="user.image" alt="">
    <div class="col-sm-8">
      <h1 v-if="!isEditing">{{user.profileName}}</h1>
      <h1><input v-if="isEditing" type="text" v-model="profileNameBufferComputed"></h1>
      <p>{{user.summery}}</p>
      <p>{{isEditing}}</p>
      <button v-if="!isEditing" @click="isEditing = true">Edit profile</button>
      <button v-if="isEditing" @click="isEditing = false;">Cancel editing</button>
      <button v-if="isEditing" @click="updateUserName(profileNameBuffer); isEditing = false">Save</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Editable from './Editable.vue';
export default {
  components: {
    'editable': Editable
  },
  data(){
    return {
      profileNameBuffer: "",
      isEditing: false
    }
  },
  methods: {
    ...mapActions(['updateUserName']),
  },
  computed: {
    profileNameBufferComputed: {
      get: function () {
        this.profileNameBuffer = this.$store.state.user.profileName
        return this.profileNameBuffer
      },
      set: function (newValue) {
        this.profileNameBuffer = newValue
        this.$store.commit('syncUserName', newValue)
      }
    },
    
    ...mapState(['user', 'projects'])
  }
};
</script>