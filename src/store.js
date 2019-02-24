import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './firebase';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    user: {},
    projects: {},
    projectID: "",
    project: {}
  },
  actions: {
    fetchProject(context, id) {
      let projectRef = firebase.fetchProject(id)
      projectRef.then(doc => {
        context.commit('syncProjectID', id)
        context.commit('syncProject', doc.data())
      })
    },
    updateProject(context, { image, name, overview }) {
      console.log("from store.updateProject ", { image, name, overview })
      if (image) {
        let uploadRef = firebase.uploadProjectImage(image)  // storage
        uploadRef.then(function (imgURL) {
          firebase.updateProject(context.state.projectID, imgURL, name, overview)
            .then((docRef) => {
              context.commit('syncProjectImage', imgURL)
              context.commit('syncProjectName', name)
              context.commit('syncProjectOverview', overview)
            })
        });
      } else {
        firebase.updateProject(context.state.projectID, context.state.project.heroImage, name, overview)
          .then((docRef) => {
            context.commit('syncProjectName', name)
            context.commit('syncProjectOverview', overview)
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
    },
    syncProjectID(state, projectID) {
      state.projectID = projectID;
    },
    syncProjectImage(state, image) {
      state.project.image = image;
    },
    syncProjectName(state, name) {
      state.project.name = name;
    },
    syncProjectOverview(state, overview) {
      state.project.overview = overview;
    },
  }
});