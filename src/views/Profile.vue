<template>
  <div>
    <h1>{{ $route.params.userID }}'s Profile Page</h1>
    <button class="btn btn-primary" @click="handlerEdit">Edit my blog</button>
  </div>
</template>

<script>
const _console = window.console;
export default {
  methods: {
    handlerEdit() {
      // load UserID
      // load user info from server , then save in Vuex. Maybe???
      this.$router
        .push({ name: "Edit", params: { userID: "Jason" } })
        .catch(err => {
          if (err) _console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
