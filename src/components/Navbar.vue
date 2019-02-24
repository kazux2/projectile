<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="" width="30" height="30" class="d-inline-block align-top" alt="">
        OWARABLE
      </a>
      <button @click="logOut">Log out</button>
      <button v-if="!user" class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="logIn">Search</button>
      <router-link tag="a" v-bind:to="{name:'MyPage'}">
        <a v-if="user" class="navbar-text">{{user.nickname}}</a>
      </router-link>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from "../firebase";
export default {
  computed: mapState(['user', 'projects']),
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    logIn() {
      this.$router.push('/auth')
    }
  }
}
</script>

