<template>
  <div class="logout">
    <h1>Your Already Log Out...</h1>
  </div>
</template>

<script>
import axios from "axios";
const _console = window.console;
export default {
  mounted() {
    setTimeout(()=>{
      this.$router.push({name:'Home'})
    },1000)
  },
  beforeRouteEnter(to, from, next) {
    axios.get("http://127.0.0.1:7000/Logout").then(res => {
      _console.log('Msg from server: ',res);
      next();
    });
  }
}
</script>

<style scoped>
.logout {
  position: relative;
  color: red;
  top: 30%;
  transform: translateY(-30%);
}
</style>
