<template>
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/account">Account</router-link> |
    <router-link to="/delivery">Delivery</router-link> |
    <router-link to="/order">Order</router-link> |
    <router-link to="/order-history">OrderHistory</router-link> |
    <router-link to="/sponsorship">Sponsorship</router-link> |
    <router-link to="/notification">Notification</router-link> |
    <router-link to="/item">Item</router-link> |
    <router-link to="/dishes">Menu</router-link> |
    <router-link to="/component">Component</router-link> |
    <router-link to="/statistic">Statistic</router-link> |
    <router-link to="/dashboard">Dashboard</router-link> |
    <router-link to="/logs">Logs</router-link> |
    <router-link to="/research">Research</router-link>
    <div v-for="resto in restaurants" :key="resto">
      <RestoCard />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RestoCard from '../components/UI/Home/RestoCard.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    RestoCard,
  },
  data() {
    return {
      restaurants: ['yo', 'yoloooooooooooooooooooooooooo'],
    };
  },
});
</script>
