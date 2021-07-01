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
    <div class='d-flex align-content-start flex-wrap justify-space-around'>
      <div v-for='resto in restaurants' :key='resto.name'>
        <RestoCard :info='resto' />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import axios from 'axios';
import RestoCard from '../components/UI/Home/RestoCard.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    RestoCard,
  },
  data() {
    return {
      restaurants: null,
    };
  },
  methods: {
    async queryResto() {
      const response = await axios.get('/restaurant');
      this.restaurants = response.data;
    },
  },
  async created() {
    this.queryResto();
  },
});
</script>
