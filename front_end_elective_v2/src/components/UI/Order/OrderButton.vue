<template>
  <div>
    <v-btn
      class="ma-2"
      color="secondary"
      @click="createOrder()"
    >
      Créer
    </v-btn>
    <v-btn
      class="ma-2"
      color="secondary"
      @click="editOrder()"
    >
      Editer
    </v-btn>
    <v-btn
      class="ma-2"
      color="secondary"
      @click="deleteOrder()"
    >
      Supprimer
    </v-btn>
    <v-btn
      class="ma-2"
      color="secondary"
      @click="payOrder()"
    >
      Payer
    </v-btn>
    <v-btn
      class="ma-2"
      color="secondary"
      @click="validateOrder()"
    >
      Valider
    </v-btn>
  </div>
</template>

<script lang="ts">
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  methods: {
    createOrder() {
      console.log('1');
    },
    editOrder() {
      console.log('2');
    },
    deleteOrder() {
      console.log('3');
    },
    payOrder() {
      console.log('4');
    },
    validateOrder() {
      console.log('5');
    },
  },
})
export default class OrderButton extends Vue {}
</script>
