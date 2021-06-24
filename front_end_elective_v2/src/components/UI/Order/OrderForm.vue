<template>
  <div>
    <v-text-field v-model="message1" label="Mail du client" clearable>{{
      orderInfos.client
    }}</v-text-field>
    <v-text-field v-model="message2" label="Numéro de commande" clearable>{{
      orderInfos.command
    }}</v-text-field>
    <v-text-field v-model="message3" label="Prix de la commande" clearable>{{
      orderInfos.price
    }}</v-text-field>
    <v-text-field v-model="message4" label="Adresse de livraison" clearable>{{
      orderInfos.addresse
    }}</v-text-field>
  </div>
</template>

<script lang="ts">
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  components: {},
  data: () => ({
    message1: null,
    message2: null,
    message3: null,
    message4: null,
  }),
  props: {
    orderInfos: Object,
  },
})
export default class OrderForm extends Vue {}
</script>
