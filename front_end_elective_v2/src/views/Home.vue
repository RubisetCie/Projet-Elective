<template>
  <div>
    <!-- <router-link to='/'>Home</router-link> |
    <router-link to='/account'>Account</router-link> |
    <router-link to='/delivery'>Delivery</router-link> |
    <router-link to='/sponsorship'>Sponsorship</router-link> |
    <router-link to='/notification'>Notification</router-link> |
    <router-link to='/dishes'>Menu</router-link> |
    <router-link to='/statistic'>Statistic</router-link> |
    <router-link to='/dashboard'>Dashboard</router-link> |
    <router-link to='/logs'>Logs</router-link> |
    <router-link to='/research'>Research</router-link> -->
    <div v-for='resto in restaurants' :key='resto'>
      <RestoCard :info='resto' />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import RestoCard from '../components/UI/Home/RestoCard.vue';

import axios from 'axios';

axios.defaults.baseURL = 'localhost:3000';

export default Vue.extend({
  name: 'Home',

  components: {
    RestoCard,
  },
  data() {
    return {
      restaurants: [
        {
          name: 'Istanbul Grill',
          restaurantId: 'istanbul_4242',
          address: '12 rue de la gare, Nanterre 92000',
          status: 'open',
          image: { url: 'okdzq', name: 'dqz' },
          opening: [{ open: '09:04:16+00:00', close: '22:04:16+00:00' }],
        },
        {
          name: 'Grace Neo Pizza',
          restaurantId: 'neo_4242',
          address: '24 rue de la port, Marseille 92000',
          status: 'open',
          image: { url: 'okdzq', name: 'dqz' },
          opening: [{ open: '09:04:16+00:00', close: '22:04:16+00:00' }],
        },
      ],
    };
  },
  methods: {
    async queryResto() {
      const response = await axios.get(`/restorant?limit=10`);
      this.restaurants = response.data;
    },
  },
  async created() {
    // this.queryResto();
  },
});
</script>

