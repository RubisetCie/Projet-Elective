<template>
  <div class="dishes">
    <v-row no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <div v-for="Plat in Orders" :key="Plat">
            <OrderInCart />
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

<script lang="ts">
import Options from 'vue-class-component';
import Vue from 'vue';
import OrderInCart from '../components/UI/Cart/OrderInCart.vue';
import DeliveryInfos from '../components/UI/Cart/DeliveryInfos.vue';

@Options({
  components: {
    OrderInCart,
    DeliveryInfos,
  },
  data() {
    return {
      Orders: ['yo', 'yolo'],
    };
  },
  methods: {
    pay() {
      console.log('test test test test');
      this.$router.push('/');
      // this.loading = true
      // setTimeout(() => (this.loading = false), 2000)
    },
  },
})
export default class Cart extends Vue {}
</script>
