<template>
  <div>
    <img v-if="!selectedImage" class="img-fluid rounded" :src="image">
    <img v-if="selectedImage" class="img-fluid rounded" :src="selectedImage">
    <input v-if="isEditing" class type="file" v-on:change="onFileChange">
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      image: "",
      selectedImage: "",
      selectedImageRaw: "initialSelectedImageRawFromUploadable",
      isEditing: "initialIsEditing"
    };
  },
  updated: function() {
    this.$emit("imageSelected", {
      selectedImageRaw: this.selectedImageRaw
    });
  },
  watch: {
    value() {
      this.image = this.value.src;
      this.isEditing = this.value.isEditing;
    },
    selectedImageRaw() {
      console.log("this.selectedImageRaw changed: ", this.selectedImageRaw);
    }
  },
  methods: {
    onFileChange(e) {
      // 選択したファイルをいい感じに表示するメソッド https://qiita.com/komatzz/items/f2a25db16aca388845d3
      let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      this.selectedImageRaw = file;
      // 選択したファイルをいい感じに表示するメソッド 続き
      let reader = new FileReader();
      reader.onload = e => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  // computed: {
  //   ...mapState(["user"])
  // },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
};
</script>