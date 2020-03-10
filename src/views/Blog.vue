<template>
  <div class="about">
    <h1>This is an Blog</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";
const _console = window.console;
export default {
  data() {
    return {
      message: "Welecome to my space"
    };
  },
  beforeRouteEnter(to, from, next) {
    // modify to => axios.get(/Blog"")
    axios.get("http://127.0.0.1:7000/Blog").then(res => {
      _console.log('Msg from server: ',res);
      next();
    });
  }
};
</script>

<style scoped></style>
