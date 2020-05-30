<template>
  <div>
    <projects v-bind:projectsTable="projectsTable"></projects>
    <div v-if="(Object.keys(projectsTable).length === 0)"><p>loading...</p></div>
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