<template>
  <div class="menu">
    <div v-for="Plat in Menus" :key="Plat">
      <PlatCard />
    </div>
  </div>
</template>

<script lang="ts">
import Options from 'vue-class-component';
import Vue from 'vue';
import PlatCard from '../components/UI/Menu/PlatCard.vue';

@Options({
  components: {
    PlatCard,
  },
  data() {
    return {
      restaurants: ['yo', 'yoloooooooooooooooooooooooooo'],
    };
  },
})
export default class Menu extends Vue {}
</script>
