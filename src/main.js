import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import firebase from './firebase'
import realfirebase from "firebase";

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'

import store from './store';

Vue.use(VueRouter)
Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  created() {
    firebase.onAuth()
    this.$router.push('/mypage')

    realfirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/timeline')
      } else {
        this.$router.push('/auth')
      }
    })
  }
});