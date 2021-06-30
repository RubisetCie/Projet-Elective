import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loginStatus: false,
      userId: '',
      usertype: 5,
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
    fetchProfil(context) {
      context.commit('SET_USER', 'id:qlz');
    },
    fetchBasket(context) {
      context.commit('SET_BASKET', 'item');
    },
  },
  modules: {
  },
  getters: {
    getUser: (state) => state.user,
    getBasket: (state) => state.basket,
  },
});
