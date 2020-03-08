<template>
  <div class="logout">
    <h1>Your Already Log Out...</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(()=>{
      this.$router.push({name:'Home'})
    },1000)
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
