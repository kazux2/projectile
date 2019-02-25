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
    this.$store.dispatch('init')
    this.$router.push('/timeline') // googleのアカウント選択画面(ログイン画面ではなく)からやってきた場合はauthに飛ばすという処理を施したい（じゃないとログインボタン二回押さないといけなくなっちゃう）

    realfirebase.auth().onAuthStateChanged(user => {
      console.log("is logged in?:", this.$store.state.isLoggedIn)
      if (user && this.$store.state.isLoggedIn) {
        this.$router.push('/timeline')
      } 
    });
  }
});