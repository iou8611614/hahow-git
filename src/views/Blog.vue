<template>
  <div class="about">
    <h1>This is an Blog</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      message: "Welecome to my space"
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   axios.get("http://127.0.0.1:7000/blog").then(res => {
  //     console.log(res);
  //     next();
  //   });
  // }
};
</script>

<style scoped></style>
