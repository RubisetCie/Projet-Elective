<template>
  <v-card class='ma-10' outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class='text-overline mb-4'>Commande</div>
        <v-list-item-title class='text-h5 mb-1'>
          {{ info.id_commande }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <ul>
            <li>Restaurant : {{ info.restant_adresse }}</li>
            <li>Client : {{ info.delivery_address }}</li>
          </ul>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text> {{ action }} </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

@Options({
  components: {},
  data() {
    return {};
  },
  props: {
    info: Object,
    action: String,
  },
})
export default class DeliveryMan extends Vue {}
</script>
