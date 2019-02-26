<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view> 
  </div>
</template>

<style>
  @import './assets/main.css';
</style>

<script>
import { mapState } from 'vuex';
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',
  computed: mapState(['user', 'projectsTable']),
  components: {
    'navbar': Navbar
  },
}
</script>

