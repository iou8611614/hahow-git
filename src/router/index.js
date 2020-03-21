import Vue from "vue";
import VueRouter from "vue-router";
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

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: Home
//   },
//   {
//     path: "/Blog",
//     name: "Blog",
//     meta: {
//       requireAuth: true
//     },
//     component: () => import("../views/Blog.vue")
//   },
//   {
//     path: "/Register",
//     name: "Register",
//     component: () => import("../views/Register.vue")
//   },
//   {
//     path: "/Login",
//     name: "Login",
//     component: () => import("../views/Login.vue")
//   },
//   {
//     path: "/Logout",
//     name: "Logout",
//     component: () => import("../views/Logout.vue")
//   },
//   {
//     path: "/Upload",
//     name: "Upload",
//     component: () => import("../views/Upload.vue")
//   },
//   {
//     path: "*",
//     redirect: "/"
//   }
// ];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requireAuth);
  console.log("Router before each ==> ", requireAuth);
  next();
});

export default router;
