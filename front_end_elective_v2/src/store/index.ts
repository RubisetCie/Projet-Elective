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
  },
  actions: {
    fetchProfil(context, payload) {
      context.commit('SET_USER', payload);
    },
    fetchBasket(context, payload) {
      context.commit('SET_BASKET', payload);
    },
  },
  modules: {
  },
  getters: {
    getUser: (state) => state.user,
    getBasket: (state) => state.basket,
  },
});
