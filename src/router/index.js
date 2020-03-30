import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
const _console = window.console;
Vue.use(VueRouter);

const routes = [
  {
    path: "/Blog",
    component: () => import("../views/Home.vue"),
    children: [
      {
        // Welcome Page.
        path: "Welcome",
        name: "Welcome",
        component: () => import("../views/Welcome.vue")
      },
      {
        // Login Page.
        path: "Login",
        name: "Login",
        component: () => import("../views/Login.vue")
      },
      {
        // Logout Page.
        path: "Logout",
        name: "Logout",
        component: () => import("../views/Logout.vue")
      },
      {
        // Register Page.
        path: "Register",
        name: "Register",
        meta: {
          requireAuth: false
        },
        component: () => import("../views/Register.vue")
      },
      {
        // User Profile Page.
        path: "Profile/:userID",
        name: "Profile",
        props: true,
        params: true,
        meta: {
          requireAuth: true
        },
        component: () => import("../views/Profile.vue")
      },
      {
        // User Edit Page.
        path: "Edit/:userID",
        name: "Edit",
        props: true,
        params: true,
        meta: {
          requireAuth: true
        },
        component: () => import("../views/Edit.vue")
      },
      // {
      //   // Upload Page.
      //   path: "Upload",
      //   name: "Upload",
      //   component: () => import("../views/Upload.vue")
      // }
    ]
  },
  {
    // passenger can see single member blog page.
    path: '/Blog/:user/',
    name: 'userblog',
    params: true,
    meta: {
      requireAuth: true
    },
    component: () => import("../views/Blog.vue")
  },
  {
    path: "*",
    redirect: "/Blog"
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(m=>m.meta.requireAuth)){
    if(to.name=='Login'){
      next()
    }else{
      if(localStorage.getItem('myToken')){
        axios
          .post("http://127.0.0.1:7000/Blog/Verify",{
            userToken: localStorage.getItem('myToken')
          })
          .then((res)=>{
            _console.log(res.data.tokenVerify)
            if(res.data.tokenVerify){
              next()
            }else{
              alert('Token Expire')
              next('/Blog/Login')
            }
          })
          .catch((err)=>{
            _console.log(err)
          })
      }else{
        next('/Blog/Login')
      }
    }
  }else{
    next()
  }
});




export default router;
