<template>
  <div class='dishes'>
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
