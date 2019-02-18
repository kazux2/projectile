import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import firebase from 'firebase'
import VueFire from 'vuefire'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueFire)
Vue.use(BootstrapVue);
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/timeline')
      } else {
        this.$router.push('/auth')
      }
    });
  }
});