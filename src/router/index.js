import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Blog",
    name: "Blog",
    component: () => import("../views/Blog.vue")
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/Logout",
    name: "Logout",
    component: () => import("../views/Logout.vue")
  },
  {
    path: "/Upload",
    name: "Upload",
    component: () => import("../views/Upload.vue")
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  // model: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
