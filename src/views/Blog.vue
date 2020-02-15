<template>
  <div class="about">
    <h1>This is an Blog</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
// import Vue from "vue";
import axios from "axios";
// import VueAxios from "vue-axios";
// Vue.use(Vue.Axios, axios);

export default {
  data() {
    return {
      message: "Welecome to my space"
    };
  },
  beforeRouteEnter(to, from, next) {
    axios.get("http://localhost:3000/blog").then(res => {
      console.log(res);
      next();
    });
  }
};
</script>

<style scoped></style>
