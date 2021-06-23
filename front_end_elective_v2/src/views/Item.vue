<template>
  <div class="item">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  components: {

  },
})
export default class Item extends Vue {}
</script>
