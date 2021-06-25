<template>
  <div>
   <v-card
    class='mx-auto'
    max-width='344'
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class='text-overline mb-4'>
          OVERLINE
        </div>
        <v-list-item-title class='text-h5 mb-1'>
          Headline 5
        </v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size='80'
        color='grey'
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        @click='reserve'
      >
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script lang='ts'>
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  methods: {
    reserve() {
      console.log('test test test test');
      this.$router.push('/cart');
      // this.loading = true
      // setTimeout(() => (this.loading = false), 2000)
    },
  },
})
export default class PlatCard extends Vue {}
</script>
