<template>
  <div class="order">
    <OrderButton />
    <OrderForm
      :orderInfos="{
        client: 'test',
        command: 'testcommand',
        price: 'pricecommand',
        addresse: 'adressecommande',
      }"
    />
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import Options from 'vue-class-component';
import Vue from 'vue';
import OrderButton from '../components/UI/Order/OrderButton.vue';
import OrderForm from '../components/UI/Order/OrderForm.vue';

@Options({
  components: {
    OrderButton,
    OrderForm,
  },
})
export default class Order extends Vue {}
</script>
