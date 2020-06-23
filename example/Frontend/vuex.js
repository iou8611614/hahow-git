import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    queryString: "",
    user_token: "",
    isLogin: false,
  },

  mutations: {
    search: function(state, query) {
      state.queryString = query;
    },

    setEmptyString: function(state) {
      state.queryString = "";
    },

    setToken: function(state, token) {
      state.user_token = token;

      window.localStorage.setItem("userToken", token);
    },

    accountLogin: function(state) {
      state.isLogin = true;
    },

    accountLogOut: function(state) {
      state.isLogin = false;
    },

    clearToken: function(state) {
      state.user_token = "";

      window.localStorage.clear();
    },
  },

  getters: {
    getString: function(state) {
      return state.queryString.trim();
    },

    getUserToken: function(state) {
      return state.user_token;
    },

    getLoginStatus: function(state) {
      return state.isLogin;
    },
  },

  actions: {},

  modules: {},
});
