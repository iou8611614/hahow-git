<template>
  <div>
    <form
      action="http://127.0.0.1:7000/upload"
      method="POST"
      enctype="multipart/form-data"
    >
      <input type="file" ref="file" name="content" />
      <button type="submit" class="btn btn-primary">Send File</button>
    </form>
    <!-- <input type="file" ref="file" @change="uploadHandler" name="content"/>
    <button type="button" class="btn btn-primary" @click="sendFile">Send File</button> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      uploadFile: ""
    };
  },
  methods: {
    uploadHandler() {
      console.log(this.$refs.file.files);
      this.uploadFile = this.$refs.file.files;
    },
    sendFile() {
      let formData = new FormData();
      formData.append("file", this.uploadFile);
      axios
        .post("http://127.0.0.1:7000/Blog/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log("Done!");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
