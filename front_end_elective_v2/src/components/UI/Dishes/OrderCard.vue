<template>
  <div>
    <v-card class="mx-auto" max-width="844" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">{{info.status}}</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ info.date }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{info.address}}
            <ul>
              <li v-for="plate in info.items" :key="plate.id">
                {{ plate.id }} : {{plate.price * (1+ info.taxes)}}</li>
            </ul>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  props: {
    info: Object,
  },
})
export default class PlatCard extends Vue {}
</script>
