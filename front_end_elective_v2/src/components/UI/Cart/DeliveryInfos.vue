<template>
  <div>
    <v-text-field v-model="message1" label="Adresse" clearable>{{
      deliveryData.adresse
    }}</v-text-field>
    <v-text-field v-model="message2" label="Numéro d'appartement, porte, étage" clearable>{{
      deliveryData.number
    }}</v-text-field>
    <v-text-field v-model="message3" label="Code de la porte / nom de famille" clearable>{{
      deliveryData.code
    }}</v-text-field>
    <v-text-field v-model="message4" label="Complement" clearable>{{
      deliveryData.complement
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
    deliveryData: Object,
  },
})
export default class DeliveryInfos extends Vue {}
</script>
