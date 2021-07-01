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
        // refresh: '',
      };
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
  },
  modules: {
  },
  getters: {
    getUser: (state) => state.user,
    getBasket: (state) => state.basket,
  },
});
