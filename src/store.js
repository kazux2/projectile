import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './firebase';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    user: {},
    projects:[]
  },
  actions: {
    updateUserName (context, newValue) {
      firebase.setUserName(context.state.userId, newValue)
      .then((docRef) => {
        context.commit('syncUserName', newValue)
      })
    }
  },
  mutations: {
    storeUserId(state, userId) {
      state.userId = userId;
    },
    syncUser(state, user) {
      state.user = user;
    },
    syncUserName(state, userName) {
      state.user.profileName = userName;
    },
    syncProjects(state, projects) {
      state.projects = projects;
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    projects(state) {
      return state.projects;
    }
  }
});