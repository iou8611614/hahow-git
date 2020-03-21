<template>
  <div class="logout">
    <h1>Your Already Log Out...</h1>
    <h3>Bye Bye!</h3>
  </div>
</template>

<script>
import axios from "axios";
const _console = window.console;
export default {
  mounted() {
    setTimeout(()=>{
      this.$router.push({name:'Welcome'})
                  .catch(err=>{
                      if(err) _console.log(err)
                  });
    },1500)
  },
  beforeRouteEnter(to, from, next) {
    axios.get("http://127.0.0.1:7000/Blog/Logout").then(res => {
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
