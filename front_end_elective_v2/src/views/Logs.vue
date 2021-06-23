<template>
  <div class="logs">
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
export default class Logs extends Vue {}
</script>
