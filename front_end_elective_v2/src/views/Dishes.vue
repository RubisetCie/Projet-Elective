<template>
  <!-- <div class='dishes' v-if='resto || order'> -->
    <div class="d-flex align-content-start flex-wrap justify-space-around">
      <div v-if='mode === 1'>
        <div v-for='menu in resto.menu' :key='menu.restaurantId'>
          <PlatCard :info='menu' />
        </div>
      </div>
      <div v-else-if="mode > 1">
        <div v-for='ords in order' :key='ords.date'>
          <OrderCard :info='ords' />
        </div>
      </div>
      <v-card :loading='loading' class='mx-12 my-12' max-width='374'>
      <template slot='progress'>
        <v-progress-linear
          color='deep-purple'
          height='10'
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>{{resto.name}}</v-card-title>

      <v-card-text>
        <v-row align='center' class='mx-0'>
          <v-rating
            :value='resto.rating'
            color='amber'
            dense
            half-increments
            readonly
            size='14'
          ></v-rating>

          <div class='grey--text ms-4'>
            {{resto.rating}} ({{Math.round(Math.random() * 2000)}})
          </div>
        </v-row>

        <div class='my-4 text-subtitle-1'>$ • Italian, Cafe</div>

        <div>
            {{resto.description}}
        </div>
      </v-card-text>
    </v-card>
    </div>
  <!-- </div> -->
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';
import axios from 'axios';

import PlatCard from '@/components/UI/Dishes/PlatCard.vue';
import OrderCard from '@/components/UI/Dishes/OrderCard.vue';

axios.defaults.baseURL = 'localhost:3000';

@Options({
  components: {
    PlatCard,
    OrderCard,
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
        rating: Math.round(Math.random() * 50) / 10,
        opening: [{ open: '09:04:16+00:00', close: '22:04:16+00:00' }],
        tags: ['kebab', 'grec', 'pas cher'],
        description: 'au kebab du soleil :)',
        menu: [
          {
            id: 'burger_8556',
            name: 'Menu Burger Raclette',
            image: {
              url: 'https://media.gqmagazine.fr/photos/5f1ffee00bc2e326afb66dc7/16:9/w_976,h_549,c_limit/Capture%20d%E2%80%99e%CC%81cran%202020-07-28%20a%CC%80%2012.32.53.png',
              name: 'dqz',
            },
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
            image: {
              url: 'https://i.f1g.fr/media/madame/1900x1900/sites/default/files/img/2016/08/regime-photo-12.jpg',
              name: 'dqz',
            },
            items: ['Salade Vegane', 'Eau'],
          },
        ],
      },
      order: [
        {
          clientId: '4548',
          address: '42 rue du General de Gaule, Paris 75003',
          date: '28/06/2021',
          status: 'open',
          taxes: '0.20',
          items: [
            { id: 'burger_8556', price: '8.00' },
            { id: 'vegan_salade_6156460', price: '14.00' },
          ],
          restaurantId: 'istanbull_4242',
          assign: null,
        },
        {
          clientId: '4548',
          address: '42 rue du General de Gaule, Paris 75003',
          date: '29/06/2021',
          status: 'close',
          taxes: '0.20',
          items: [
            { id: 'burger_8556', price: '8.00' },
            { id: 'vegan_salade_6156460', price: '14.00' },
          ],
          restaurantId: 'istanbull_4242',
          assign: 'xmax_pas_les_feu_42',
        },
      ],
      mode: 0,
      id: this.$route.params.id,
    };
  },
  methods: {
    async queryMenu() {
      const response = await axios.get(`/restorant/${this.id}`);
      this.resto = response.data;
    },
    async queryOrder() {
      const response = await axios.get(
        `/order/${this.id}?status[]=open,preparing,delevering`,
      );
      this.order = response.data;
    },
    async queryCloseOrder() {
      const response = await axios.get(
        `/order/${this.id}?status[]=close,reviewing`,
      );
      this.order = response.data;
    },
    selector() {
      if (this.$route.name === 'Menus') {
        // this.queryMenu();
        this.mode = 1;
      } else if (this.$route.name === 'Commande') {
        // this.queryOrder();
        this.mode = 2;
      } else if (this.$route.name === 'Commande Terminée') {
        // this.queryCloseOrder();
        this.mode = 3;
      }
    },
  },
  async created() {
    this.selector();
    console.log(this.$route.name);
    console.log(this.mode);
    this.$watch(() => this.$route, this.selector);
  },
})
export default class Dishes extends Vue {}
</script>
