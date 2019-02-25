<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<script>
import firebase from "firebase";
import firebasejs from "../firebase";
import firebaseui from "firebaseui";
export default {
  name: "auth",
  mounted() {
    let uiConfig = { signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID] };
    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>