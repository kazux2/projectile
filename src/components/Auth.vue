<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<script>
import firebase from "firebase";
import firebaseui from "firebaseui";
import { config } from "../helpers/firebaseConfig";
export default {
  name: "auth",
  mounted() {
    let uiConfig = {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
    };
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>