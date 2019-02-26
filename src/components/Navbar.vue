<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="timeline">{{isLoggedIn}}OWARABLE</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button v-if="!isLoggedIn" size="sm" class="my-2 my-sm-0" @click="logIn">Log in</b-button>
        <b-nav-item-dropdown right v-if="isLoggedIn">
          <template slot="button-content"><em>{{user.nickname}}</em></template>
          <b-dropdown-item to="mypage">My page</b-dropdown-item>
          <b-dropdown-item @click="logOut">Sign out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
  </b-navbar>






    <!-- <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src width="30" height="30" class="d-inline-block align-top" alt>
        OWARABLE
      </a>
      <button @click="logOut">Log out</button>
      <button
        v-if="!user"
        class="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        @click="logIn"
      >Search</button>
      <router-link tag="a" v-bind:to="{name:'MyPage'}">
        <a v-if="user" class="navbar-text">{{user.nickname}}</a>
      </router-link>

      <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>
      <div class="nav navbar-nav">
        <div class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >{{user.nickname}}</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link tag="a" v-bind:to="{name:'MyPage'}">
            <a class="dropdown-item">MyPage</a>
          </router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="logOut">Log out</a>
          </div>
        </div>
      </div>
    </nav> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "../firebase";
export default {
  mounted(){console.log(this.$store.state.userId)},
  computed: mapState(["isLoggedIn", "user", "projectsTable"]),
  methods: {
    logOut() {
      firebase.logOut();
    },
    logIn() {
      this.$router.push("/auth");
    }
  }
};
</script>

