<template>
  <div v-if="resumeMenu">
    <v-card outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">Menu</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ resumeMenu.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <ul>
              <li v-for="plate in resumeMenu.items" :key="plate">{{ plate }}</li>
            </ul>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
        >        <v-img
          :src="resumeMenu.image.url"
          height="80px"
          with="80px"
        ></v-img></v-list-item-avatar>

      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text @click="remove(resumeMenu.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

@Options({

  data() {
    return {
      resumeMenu: null,
    };
  },
  props: {
    menuId: Number,
  },
  methods: {
    remove(id) {
      // j'ai pas encore le temps
    },
    validate() {
      // d
    },
    async getMenuByID() {
      const response = await axios.get(`/menu/${this.menuId}}`);
      this.resumeMenu = response.data;
    },
  },
  async created() {
    this.getMenuByID();
  },
})
export default class OrderInCart extends Vue {}
</script>
