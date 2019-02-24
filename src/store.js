import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './firebase';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    user: {},
    projects: {},
    project: {}
  },
  actions: {
    fetchProject(context, id) {
      let projectRef = firebase.fetchProject(id)
      projectRef.then(doc => {
        context.commit('syncProject', doc.data())
      })
    },
    updateProject(context, { image, name, overview }) {
      if (image) {
        let uploadRef = firebase.uploadProjectImage(image)  // storage
        uploadRef.then(function (imgURL) {
          firebase.updateProject(theID, imgURL, name, overview)
            .then((docRef) => {
              context.commit('')
            })
        });
      } else {
        firebase.updateProject(theID, context.state.project.heroImage, name, overview)
          .then((docRef) => {
            context.commit('')
          })
      }
    },
    updateUserProfile(context, { image, nickname, summery }) {
      //actionの引数は2こなのでオブジェクトにまとめてる
      if (image) {
        let uploadRef = firebase.uploadProfileImage(image)  // storage
        uploadRef.then(function (imgURL) {
          firebase.updateUserProfile(context.state.userId, imgURL, nickname, summery)
            .then((docRef) => {
              context.commit('syncUserImageURL', imgURL)
              context.commit('syncUserNickname', nickname)
              context.commit('syncUserSummery', summery)
            })
        });
      } else {
        firebase.updateUserProfile(context.state.userId, context.state.user.image, nickname, summery)
          .then((docRef) => {
            context.commit('syncUserNickname', nickname)
            context.commit('syncUserSummery', summery)
          })
      }
    },
  },
  mutations: {
    storeUserId(state, userId) {
      state.userId = userId;
    },
    syncUser(state, user) {
      state.user = user;
    },
    syncUserImageURL(state, url) {
      console.log("syncing new url", url)
      state.user.image = url;
    },
    syncUserNickname(state, nickname) {
      state.user.nickname = nickname;
    },
    syncUserSummery(state, summery) {
      state.user.summery = summery;
    },
    syncProjects(state, projects) {
      state.projects = projects;
    },
    syncProject(state, project) {
      state.project = project;
    }
  }
});