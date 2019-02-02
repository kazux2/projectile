<template> 
  <div> 
    <h1>Signup succeeded</h1> 
    <button @click='logOut'>Log out</button> 
    <hr> 
    <p>{{user}}</p>
    <hr>
    <dir>
      <p>Project Name: {{ projectName }}</p>
      <p>Project Description: {{ projectDescription }}</p>
      <p>Project Name:</p><input v-model="projectName" placeholder="edit me">
      <p>Project Description:</p><textarea v-model="projectDescription" placeholder="add multiple lines"></textarea>
      <button v-on:click="storeProjects">Save</button>
    </dir>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
 data(){
   return {
    "user": "",
    "projectName": "",
    "projectDescription": ""
}
 },
   created() {
     let vm = this
     firebase.auth().onAuthStateChanged(function(user) {
       if (user) {
         vm.user = user.displayName;
      }
    });
    let firebaseDatabase = firebase.database()
    firebase.database().ref('project')
      .once('value').then(function(snapshot){
        let data = snapshot.val()
        if (data){
          vm.projectName = data.name
          vm.projectDescription = data.description
        }        
      })
    
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