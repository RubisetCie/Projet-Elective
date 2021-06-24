<template>
  <div class='account'>
    <v-btn elevation='5' @click='tructructruc()'> clique ici</v-btn>
    <img alt='Vue logo' src='../assets/logo.png' />
    <!-- <HelloWorld msg='Welcome to Your Vue.js + TypeScript App' /> -->
    <v-carousel v-model='model'>
      <v-carousel-item v-for='(color, i) in colors' :key='color'>
        <v-sheet :color='color' height='100%' tile>
          <v-row class='fill-height' align='center' justify='center'>
            <div class='text-h2'>Slide {{ i + 1 }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script lang='ts'>
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  components: {},
  data: () => ({
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
  }),
  methods: {
    tructructruc() {
      console.log('truc');
    },
  },
})
export default class Account extends Vue {}
</script>
