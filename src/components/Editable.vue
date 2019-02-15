<template>
  <div id="editable">
    <div v-if="!isEditing" v-text="value" v-on:click="isEditing = true"></div>
    <input v-if="isEditing" type="text" v-model="value" v-on:blur="isEditing = false" v-auto-focus>
  </div>
</template>

<script>
export default {
  name: "Editable",
  props: ["value"],
  data() {
    return {
      isEditing: false
    };
  }
};

</script>

