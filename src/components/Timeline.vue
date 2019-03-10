<template>
  <div>
    <projects v-bind:projectsTable="projectsTable"></projects>
  </div>
</template>

<script>
import Projects from './Projects.vue';
import { mapState } from 'vuex';

export default {
  components: {
    'projects': Projects
  },
  computed: mapState(['projectsTable']),
};
</script>