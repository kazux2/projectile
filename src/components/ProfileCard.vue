<template>
  <div class="container">
  <div class="row">
    <img class="col-sm-4 rounded-circle" :src="user.image" alt="">
    <div class="col-sm-8">
      <h1>{{user.profileName}}</h1>
      <p>{{user.summery}}</p>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: mapState(['user', 'projects'])
};
</script>