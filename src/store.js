import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    projects:[]
  },
  mutations: {
    syncUser(state, user) {
      state.user = user;
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