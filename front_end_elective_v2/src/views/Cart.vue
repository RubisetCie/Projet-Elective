<template>
  <div class="dishes">
    <v-row no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <div v-if="Orders.length > 0">
            <div v-for="Plat in Orders" :key="Plat">
              <OrderInCart :menuId="Plat"/>
            </div>
          </div>
          <div v-else>
            <p>Votre Panier est vide</p>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>
        <DeliveryInfos :deliveryData="{ adresse: 'test', number: 'testcommand',
        code: 'pricecommand', complement: 'adressecommande', }" />
        </v-card>
      </v-col>
    </v-row>
    <v-card-actions  class="justify-center">
      <v-btn outlined rounded text @click="pay"> Payer </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';
import axios from 'axios';
import OrderInCart from '../components/UI/Cart/OrderInCart.vue';
import DeliveryInfos from '../components/UI/Cart/DeliveryInfos.vue';

@Options({
  components: {
    OrderInCart,
    DeliveryInfos,
  },
  data() {
    return {
      Orders: null,
      data: null,
    };
  },
  methods: {
    pay() {
      this.data = {
        clientId: '4548',
        address: '42 rue du General de Gaule, Paris 75003',
        date: '28/06/2021', // il faut que je regarde la ISO 8601 ou un truc du genre
        status: 'open',
        taxes: '0.20',
        items: [
          { id: 'burger_8556', price: '8.00' },
          { id: 'vegan_salade_6156460', price: '14.00' },
        ],
        restaurantId: 'istanbull_4242',
        assign: null,
      };
      this.validate(this.data);
    },
    loadBasket() {
      this.Orders = this.$store.getters.getBasket;
    },
    async validate(data) {
      const response = await axios.post('/order/', data);
      if (response.status === 204) {
        this.redirect('/order');
      }
    },
  },
  async created() {
    this.loadBasket();
  },
})
export default class Cart extends Vue {}
</script>
