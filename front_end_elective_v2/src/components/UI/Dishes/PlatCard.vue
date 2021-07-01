<template>
  <div>
    <v-card class="mx-auto" max-width="844" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">Menu</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ info.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <ul>
              <li v-for="plate in info.items" :key="plate">{{ plate }}</li>
            </ul>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
        >        <v-img
          :src="info.image.url"
          height="80px"
          with="80px"
        ></v-img></v-list-item-avatar>

      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text @click="reserve(info.id)"> Ajouter </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  props: {
    info: Object,
  },
  methods: {
    reserve(id) {
      const basket = this.$store.getters.getBasket;
      basket.push(id);
      this.$store.dispatch('fetchBasket', basket);
    },
  },
})
export default class PlatCard extends Vue {}
</script>
