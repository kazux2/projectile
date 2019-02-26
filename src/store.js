import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './firebase';
import realfirebase from 'firebase';
Vue.use(Vuex);

function initialState () {
  return {
    isLoggedIn:false,
    userId: '',
    user: {},
    projectsTable: {},
    projectID: "",
    project: {}
  }
}

export default new Vuex.Store({
  state: {
    isLoggedIn:false,
    userId: '',
    user: {},
    projectsTable: {},
    projectID: "",
    project: {}
  },
  actions: {
    init(context) {
      realfirebase.auth().onAuthStateChanged(user => {
        if(user){
          context.commit('storeUserId', user.uid);
          context.commit('storeIsLoggedIn', true);
          firebase.db.collection("users")
            .doc(user.uid)
            .get().then(doc => {
              context.commit('syncUser', doc.data());
            })
          context.dispatch('fetchProjectsTable')
        } else {
          context.dispatch('resetState')
        }
        
      });
    },
    resetState(context){
      context.commit("resetState");
    },
    fetchProject(context, id) {
      let projectRef = firebase.fetchProject(id)
      projectRef.then(doc => {
        context.commit('syncProjectID', id)
        context.commit('syncProject', doc.data())
      })
    },
    fetchProjectsTable(context) {
      firebase.db.collection("projectsTable")
            .get().then(docs => {
              var projectsTable = {};
              docs.forEach(doc => {
                projectsTable[doc.id] = doc.data();
              });
              context.commit("syncProjectsTable", projectsTable)
            })
    },
    updateProject(context, { image, name, overview }) {
      if (image) {
        let uploadRef = firebase.uploadProjectImage(image)  // storage
        uploadRef.then(function (imgURL) {
          firebase.updateProject(context.state.projectID, imgURL, name, overview)
            .then((docRef) => {
              context.commit('syncProjectImage', imgURL)
              context.commit('syncProjectName', name)
              context.commit('syncProjectOverview', overview)
            })
          firebase.setProjectInProjectsTable(context.state.projectID, name, null, imgURL)
          .then(docRef => {
            context.dispatch('fetchProjectsTable')
          });
        });
      } else {
        firebase.updateProject(context.state.projectID, context.state.project.heroImage, name, overview)
          .then((docRef) => {
            context.commit('syncProjectName', name)
            context.commit('syncProjectOverview', overview)
          })
        firebase.setProjectInProjectsTable(context.state.projectID, name, null, context.state.project.heroImage)
        .then(docRef => {
          context.dispatch('fetchProjectsTable')
        });
      };
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
    createProject(context, name) {
      if (!name) {
        name = "このプロジェクトの名前！"
      }
      firebase.createProject(name)
      .then(docRef => {
        firebase.setProjectInProjectsTable(docRef.id, name, null, null)
        .then(docRef => {
          context.dispatch('fetchProjectsTable')
        });
    });
    }
  },
  mutations: {
    resetState(state) {
      // acquire initial state
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
    storeIsLoggedIn(state, isLoggedIn){
      state.isLoggedIn = isLoggedIn
    },
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
    syncProjectsTable(state, projectsTable) {
      state.projectsTable = projectsTable;
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