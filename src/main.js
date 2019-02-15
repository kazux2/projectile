import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import firebaseui from 'firebaseui';
import { config } from './helpers/firebaseConfig'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
Vue.use(VueRouter)
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// var admin = require('firebase-admin');

new Vue({
  router,
  created() {
    // this.$router.push('/project/1')

    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/timeline')
      } else {
        this.$router.push('/auth')
      }
     });


    },
  el: '#app',
  render: h => h(App)
});