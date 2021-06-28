<template>
  <v-app>
    <HomeBar />
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue';
import HomeBar from './components/UI/HomeBar/HomeBar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HomeBar,
  },
  data: () => ({
    //
  }),
});
</script>
