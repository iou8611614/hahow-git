<template>
  <div class="home">
    <router-view></router-view>
    <!-- <button class="btn btn-primary" @click="getToken">Get Token</button>
    <button class="btn btn-danger" @click="tokenVerify">Token Verify</button> -->
  </div>
</template>

<script>
// import axios from "axios";
const _console = window.console;
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$router.push({ name: "Welcome" }).catch(err => {
        if (err) _console.log(err);
      });
    },
    getToken() {
      axios
        .post("http://127.0.0.1:7000/Blog/getToken", {
          username: "Jason Wang"
        })
        .then(res => {
          this.$store.state.token = res.data.token;
          _console.log(res);
        })
        .catch(err => {
          _console.log(err);
        });
    },
    tokenVerify() {
      axios
        .post("http://127.0.0.1:7000/Blog/Verify", {
          userToken: this.$store.state.token
        })
        .then(res => {
          _console.log(res.data.tokenVerify);
        })
        .catch(err => {
          _console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.home {
  height: 100vmin;
}
</style>
