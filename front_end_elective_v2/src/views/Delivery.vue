<template>
  <div class="delivery">
    <img alt="Vue logo" src="../assets/logo.png">
    <Map/>
  </div>
</template>

<script lang="ts">
import Options from 'vue-class-component';
import Vue from 'vue';
import Map from '../components/UI/Map/Map.vue';

@Options({
  components: {
    Map,
  },
})
export default class Delivery extends Vue {}
</script>
