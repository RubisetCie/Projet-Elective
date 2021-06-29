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
          image: { url: 'https://www.telerama.fr/sites/tr_master/files/styles/simplecrop1000/public/fauves13_0.jpg?itok=SAX57ak4', name: 'dqz' },
          tags: ['kebab', 'grec', 'pas cher'],
          opening: [{ open: '09:04:16+00:00', close: '22:04:16+00:00' }],
          description: 'au kebab du soleil :)',
        },
        {
          name: 'Grace Neo Pizza',
          restaurantId: 'neo_4242',
          address: '24 rue de la port, Marseille 92000',
          status: 'open',
          image: { url: 'https://www.lesfilsamaman.com/wp-content/uploads/restaurant-a-orlean-1.jpg', name: 'dqz' },
          opening: [{ open: '09:04:16+00:00', close: '22:04:16+00:00' }],
        },
      ],
    };
  },
  methods: {
    async queryResto() {
      const response = await axios.get('/restorant?limit=10');
      this.restaurants = response.data;
    },
  },
  async created() {
    // this.queryResto();
  },
});
</script>
