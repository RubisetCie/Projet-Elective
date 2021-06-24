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

@Options({
  components: {

  },
})
export default class Menu extends Vue {}
</script>
