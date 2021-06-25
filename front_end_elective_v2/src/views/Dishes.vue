<template>
  <div class='dishes'>
    <router-link to='/'>Home</router-link>
    <div v-for='Plat in Dishes' :key='Plat'>
      <PlatCard />
    </div>
  </div>
</template>

<script lang='ts'>
import Options from 'vue-class-component';
import Vue from 'vue';
import PlatCard from '@/components/UI/Dishes/PlatCard.vue';

@Options({
  components: {
    PlatCard,
  },
  data() {
    return {
      Dishes: ['yo', 'yolo', 'a', 'b', 'aa', 'df', 'ef'],
    };
  },
})
export default class Dishes extends Vue {}
</script>
