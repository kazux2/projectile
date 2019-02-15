<template> 
  <div> 
    <h1>Signup succeeded</h1> 
    <button @click='logOut'>Log out</button> 
    <hr> 
    <p>{{user}}</p>
    <div class="container-fluid">
      <div class="row">
        <div v-for="(value, key, index) in projectIDtoName" :key="index">  
          <ul>
            <router-link tag="li" v-bind:to="{name:'Project', params : {id: key}}">
              <li><a>{{ value }}</a></li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
let projectIDtoName_json = require( "../assets/projects.json" ).projectIDtoName;
export default {
 data(){
   return {
    "user": "",
    "projectIDtoName": projectIDtoName_json
}
 },
   created() {
     let vm = this
     firebase.auth().onAuthStateChanged(function(user) {
       if (user) {
         vm.user = user.displayName;
         vm.uid = user.uid
      }
    });
    // let firebaseDatabase = firebase.database()
    // firebase.database().ref('project')
    //   .once('value').then(function(snapshot){
    //     let data = snapshot.val()
    //     if (data){
    //       vm.projectName = data.name
    //       vm.projectDescription = data.description
    //     }        
    //   })
    
  },
  methods: {
    storeProjects () {
      // ↓ メッセージを Realtime Database に登録する処理
      firebase.database().ref('project')
        .set({name: this.projectName, description: this.projectDescription})
    },
    logOut() { 
      firebase.auth().signOut();
    } 
  },
};
</script>