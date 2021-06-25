<template>
  <div class="menu">
    <router-link to="/">Home</router-link>
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
      Menus: ['yo', 'yolo', 'a', 'b', 'aa', 'df', 'ef'],
    };
  },
})
export default class Menu extends Vue {}
</script>
