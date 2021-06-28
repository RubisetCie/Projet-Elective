<template>
  <div class="dishes" v-if="resto">
    <div v-if="restoId">
      JULIEN AJOUTE UN ENDROIT POUR LES INFOS DU RESTO OUVERT A DROITE
    </div>
    <div v-for="menu in resto.menu" :key="menu.restaurantId">
      <PlatCard :info="menu" />
    </div>
  </div>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';
import axios from 'axios';

import PlatCard from '@/components/UI/Dishes/PlatCard.vue';

axios.defaults.baseURL = 'localhost:3000';

@Options({
  components: {
    PlatCard,
  },
  data() {
    return {
      Dishes: ['yo', 'yolo', 'a', 'b', 'aa', 'df', 'ef'],
      resto: {
        name: 'istanbull',
        restaurantId: 'istanbull_4242',
        address: '12 rue de la gare, Nanterre 92000',
        status: 'open',
        image: { url: 'okdzq', name: 'dqz' },
        opening: [{ open: '09:04:16+00:00', close: '22:04:16+00:00' }],
        tags: ['kebab', 'grec', 'pas cher'],
        description: 'au kebab du soleil :)',
        menu: [
          {
            id: 'burger_8556',
            name: 'Menu Burger Raclette',
            image: { url: 'https://media.gqmagazine.fr/photos/5f1ffee00bc2e326afb66dc7/16:9/w_976,h_549,c_limit/Capture%20d%E2%80%99e%CC%81cran%202020-07-28%20a%CC%80%2012.32.53.png', name: 'dqz' },
            price: '8.00',
            items: [
              'Burger Raclette',
              'Coca-Cola Taille L',
              'Frites',
              'Sorbet',
            ],
          },
          {
            id: 'vegan_salade_6156460',
            name: 'Menu Salade Vegane',
            price: '14.00',
            image: { url: 'https://i.f1g.fr/media/madame/1900x1900/sites/default/files/img/2016/08/regime-photo-12.jpg', name: 'dqz' },
            items: ['Salade Vegane', 'Eau'],
          },
        ],
      },
      restoId: this.$route.params.id,
    };
  },
  methods: {
    async queryMenu() {
      const response = await axios.get(`/restorant/${this.restoId}`);
      this.resto = response.data;
    },
  },
  async created() {
    // this.queryMenu();
    this.$watch(() => this.$route.params.id, this.queryMenu);
  },
})
export default class Dishes extends Vue {}
</script>
