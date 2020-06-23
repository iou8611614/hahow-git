import Vue from "vue";
// import axios from "axios";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "/"
  },
  {
    path: "/login",
    name: "login",
    meta: {
      requireAuth: false
    },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      requireAuth: false
    },
    component: () => import("../views/Logout.vue")
  },
  {
    path: "/timeout",
    name: "timeout",
    meta: {
      requireAuth: false
    },
    component: () => import("../views/TimeOut.vue")
  },
  {
    path: "/singup",
    name: "signup",
    meta: {
      requireAuth: false
    },
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/setup",
    name: "setup",
    meta: {
      requireAuth: true
    },
    component: () => import("../views/ToolSetup.vue")
  },
  {
    path: "/query",
    name: "query",
    meta: {
      requireAuth: false
    },
    component: () => import("../views/Query.vue"),
    children: [
      {
        path: "/Year/:year",
        component: () => import("../views/LoadYear.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  // 待完成 ===============================================
  // Router在跳轉到權限頁面時需認證'token'是否存在 or 逾期.
  // 如'token'不存在 or 逾期，則自動導向 home page.
  // ======================================================
  window.console.log(to.path);
  if (
    to.matched.some(record => {
      window.console.log(record.meta.requireAuth);
      return record.meta.requireAuth;
    })
  ) {
    if (window.localStorage.getItem("userToken")) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
