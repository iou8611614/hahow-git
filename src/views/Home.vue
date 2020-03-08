<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Welcome />
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";

export default {
  components: {
    Welcome
  }
};
</script>
