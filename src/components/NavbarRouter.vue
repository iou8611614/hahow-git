<template>
  <!-- BootstrapVue can't using PUG syntax -->
  <b-navbar toggleable="sm" type="dark" variant="info" class="nav-route" >
        <b-navbar-toggle target="nav-collapse" class="ml-auto"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-show="this.$route.path!=='/'">
              <router-link class="route-style" class-active="active" to="/">Welcome</router-link>
            </b-nav-item>
            <b-nav-item v-show="this.$route.path!=='/Blog'">
              <router-link class="route-style" class-active="active" :to="{ name: 'Blog' }">Blog</router-link>
            </b-nav-item>
            <b-nav-item v-show="this.$route.path!=='/Login'">
              <router-link class="route-style" class-active="active" :to="{ name: 'Login' }">Login</router-link>
            </b-nav-item>
            <b-nav-item v-show="this.$route.path!=='/Logout'">
              <router-link class="route-style" class-active="active" :to="{ name: 'Logout' }">Log out</router-link>
            </b-nav-item>
            <b-nav-item v-show="this.$route.path!=='/Register'">
              <router-link class="route-style" class-active="active" :to="{ name: 'Register' }">Sign up</router-link>
            </b-nav-item>
            <b-nav-item v-show="this.$route.path!=='/Upload'">
              <router-link class="route-style" class-active="active" :to="{ name: 'Upload' }">Upload</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  // mounted(){
  //   alert(this.$route.path)
  // }
}
</script>

<style scoped>
    nav li:hover
    nav li:active {
        cursor: pointer;
    }
    nav li.nav-item {
        padding: .5rem;
    }
    nav li.nav-item:hover {
        background-color: rgba(233, 229, 229, 0.1) !important;
    }
    nav.nav-route {
        background-color: rgba(0, 0, 0, 0.1) !important;
        padding: 0 !important;
    }
    a.route-style {
        text-decoration: none;
        color: rgb(31, 30, 30);
    }
    nav li.nav-item:hover a.route-style {
        color: whitesmoke;
    }
</style>
