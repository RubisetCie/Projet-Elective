<template>
  <div class='deliveryMan' style='padding: 30px'>
    <v-row align='center' no-gutters style='height: 150px v-block'>
      <v-col>
        <v-banner>Commandes en attente :</v-banner>
      </v-col>
      <v-col>
        <v-banner>Commande en cours :</v-banner>
      </v-col>
    </v-row>
    <v-row align='center' no-gutters style='height: 150px v-block'>
      <v-col>
        <div v-for='order in available_orders' :key='order.id'>
          <DeliveryCard :info='order' :action='accept' />
        </div>
      </v-col>
      <v-col>
        <v-img
          src='https://i.imgur.com/dNbSnwK.jpg'
          height='200px'
          width='200px'
          class='ma-auto'
        ></v-img>
        <div v-for='order in current_orders' :key='order.id'>
          <DeliveryCard :info='order' :action='finish' />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';
import axios from 'axios';
import DeliveryCard from '../components/UI/DeliveryMan/DeliveryCard.vue';

axios.defaults.baseURL = 'http://localhost:3000';

@Options({
  components: {
    DeliveryCard,
  },
  data() {
    return {
      accept: 'Accepter',
      finish: 'Commande terminer',
      available_orders: [
        {
          id_commande: 'burger_8556',
          address: 'test test test',
          restant_adresse: 'test test test',
          delivery_address: 'test test test',
        },
        {
          id_commande: 'burger_8557',
          address: 'test test test',
          restant_adresse: 'test test test',
          delivery_address: 'test test test',
        },
      ],
      current_orders: [
        {
          id_commande: 'burger_8553',
          address: 'test test test',
          restant_adresse: 'test test test',
          delivery_address: 'test test test',
        },
      ],
    };
  },
})
export default class DeliveryMan extends Vue {}
</script>
