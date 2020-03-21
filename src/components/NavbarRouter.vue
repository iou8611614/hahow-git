<template>
  <!-- BootstrapVue can't using PUG syntax -->
  <!-- !!!!!!!!!
     Router display need modify mapping syntax, Use RegExp()
  !!!!!!!!! -->
  <b-navbar toggleable="sm" type="dark" variant="info" class="nav-route" >
        <b-navbar-toggle target="nav-collapse" class="ml-auto"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-show="this.$route.path!=='/Blog/Welcome' && this.$route.path!=='/Blog/Logout'">
              <router-link class="route-style" class-active="active" :to="{name:'Welcome'}">Welcome</router-link>
            </b-nav-item>
            <b-nav-item v-show="this.$route.path!=='/Blog/Login' && this.$route.path!=='/Blog/Profile/Jason' && this.$route.path!=='/Blog/Edit/Jason' && this.$route.path!=='/Blog/Logout'">
              <router-link class="route-style" class-active="active" :to="{name:'Login'}">Login</router-link>
            </b-nav-item>
            <b-nav-item v-show="this.$route.path!=='/Blog/Logout' && this.$route.path!=='/Blog/Register' && this.$route.path!=='/Blog/Login' && this.$route.path!=='/Blog/Welcome'">
              <router-link class="route-style" class-active="active" :to="{name:'Logout'}">Log out</router-link>
            </b-nav-item>
            <b-nav-item v-show="this.$route.path!=='/Blog/Register'  && this.$route.path!=='/Blog/Profile/Jason' && this.$route.path!=='/Blog/Edit/Jason' && this.$route.path!=='/Blog/Logout' && this.$route.path!=='/Blog/Login'">
              <router-link class="route-style" class-active="active" :to="{name:'Register'}">Sign up</router-link>
            </b-nav-item>
            <!-- <b-nav-item v-show="this.$route.path!=='/Blog/:user'">
              <router-link class="route-style" class-active="active" :to="{name:'blogUser'}">Blog</router-link>
            </b-nav-item> -->
            <!-- <b-nav-item v-show="this.$route.path!=='/Blog/Upload'">
              <router-link class="route-style" class-active="active" :to="{name:'Upload'}">Upload</router-link>
            </b-nav-item> -->
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
    nav .nav-link{
      padding: 0!important;
    }
    nav .nav-link a{
      display: inline-block;
      padding: 1rem;
      width: 10w;
    }
    nav li.nav-item:hover {
        background-color: rgba(233, 229, 229, 0.1) ;
    }
    nav.nav-route {
        background-color: rgba(0, 0, 0, 0.1) !important;
        padding: 0;
    }
    a.route-style {
        text-decoration: none;
        color: rgb(31, 30, 30);
    }
    nav li.nav-item:hover a.route-style {
        color: whitesmoke;
    }
</style>  
