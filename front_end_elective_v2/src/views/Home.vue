<template>
  <div>
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
