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

// import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://http://localhost:8080/',
// });

// let user = localStorage.getItem('user');
// if (!user) {
//   user = {
//     userId: -1,
//     token: '',
//   };
// } else {
//   try {
//     user = JSON.parse(user);
//     instance.defaults.headers.common.Authorization = user.token;
//   } catch (ex) {
//     user = {
//       userId: -1,
//       token: '',
//     };
//   }
// }

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     status: '',
//     user: user,
//     userInfos: {
//       nom: '',
//       prenom: '',
//       email: '',
//       accountType: '',
//       photo: '',
//     },
//   },
//   mutations: {
//     setStatus: function (state, status) {
//       state.status = status;
//     },
//     logUser: function (state, user) {
//       instance.defaults.headers.common['Authorization'] = user.token;
//       localStorage.setItem('user', JSON.stringify(user));
//       state.user = user;
//     },
//     userInfos: function (state, userInfos) {
//       state.userInfos = userInfos;
//     },
//     logout: function (state) {
//       state.user = {
//         userId: -1,
//         token: '',
//       }
//       localStorage.removeItem('user');
//     }
//   },
//   actions: {
//     login: ({ commit }, userInfos) => {
//       commit('setStatus', 'loading');
//       return new Promise((resolve, reject) => {
//         instance.post('/login', userInfos)
//           .then(function (response) {
//             commit('setStatus', '');
//             commit('logUser', response.data);
//             resolve(response);
//           })
//           .catch(function (error) {
//             commit('setStatus', 'error_login');
//             reject(error);
//           });
//       });
//     },
//     createAccount: ({ commit }, userInfos) => {
//       commit('setStatus', 'loading');
//       return new Promise((resolve, reject) => {
//         commit;
//         instance.post('/createAccount', userInfos)
//           .then(function (response) {
//             commit('setStatus', 'created');
//             resolve(response);
//           })
//           .catch(function (error) {
//             commit('setStatus', 'error_create');
//             reject(error);
//           });
//       });
//     },
//     getUserInfos: ({ commit }) => {
//       instance.post('/infos')
//         .then(function (response) {
//           commit('userInfos', response.data.infos);
//         })
//         .catch(function () {
//         });
//     }
//   },
//   modules: {
//   },
// });
