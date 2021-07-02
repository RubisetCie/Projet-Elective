import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loginStatus: false,
      userId: '',
      usertype: 5,
      token: '',
      refresh: '',
    },
    basket: [],
  },
  mutations: {
    SET_USER(state, status) {
      state.user = status;
    },
    SET_BASKET(state, itemId) {
      state.basket = itemId;
    },
    RESET_USER(state) {
      state.user = {
        loginStatus: false,
        userId: '',
        usertype: 5,
        token: '',
        refresh: '',
      };
    },
    RESET_BASKET(state) {
      state.basket = [];
    },
  },
  actions: {
    fetchProfil(context, payload) {
      context.commit('SET_USER', payload);
    },
    fetchBasket(context, payload) {
      context.commit('SET_BASKET', payload);
    },
    disconect(context) {
      context.commit('RESET_USER');
    },
    ClearBasket(context) {
      context.commit('RESET_BASKET');
    },
  },
  modules: {
  },
  getters: {
    getUser: (state) => state.user,
    getBasket: (state) => state.basket,
  },
});
