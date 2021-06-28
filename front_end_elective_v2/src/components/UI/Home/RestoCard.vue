<template>
  <div>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        :src="info.image.url"
      ></v-img>

      <v-card-title>{{info.name}}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            {{rating}} ({{Math.round(Math.random() * 2000)}})
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

        <div>
            {{info.description}}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Horaires :</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column v-for="op in info.opening" :key="op.name"
        >
          <v-chip >{{op.open}}</v-chip>
          <v-chip >{{op.close}}</v-chip>

        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text @click="reserve(info.restaurantId)">
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  data() {
    return {
      loading: false,
      selection: 1,
      rating: Math.round(Math.random() * 50) / 10,
      tags: ['Italien', 'Grill', 'Kebab', 'Grec'],
    };
  },
  props: {
    info: Object,
  },
  methods: {
    reserve(restoId) {
      console.log('test test test test');
      this.$router.push(`/menus/${restoId}`);
      // this.loading = true
      // setTimeout(() => (this.loading = false), 2000)
    },
  },
})
export default class RestoCard extends Vue {}
</script>
