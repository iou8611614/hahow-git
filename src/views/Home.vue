<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
const _console = window.console;
export default {
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.$router.push({name:'Welcome'})
                  .catch(err=>{
                      if(err) _console.log(err)
                  });;
    }
  }
};
</script>

<style scoped>
  .home {
    height: 100vmin;
  }
</style>
