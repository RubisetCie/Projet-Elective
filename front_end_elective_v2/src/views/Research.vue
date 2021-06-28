<template>
  <div class='research'>
    <v-row>
      <v-btn icon @click='showSearchBar()'>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-text-field v-show='searchBar' single-line solo></v-text-field>
    </v-row>
    <div v-if='result'></div>
  </div>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  components: {},
  data() {
    return {
      searchBar: false,
      data: Array,
      result: null,
    };
  },
  methods: {
    search() {
      return 0;
    },
    showSearchBar() {
      this.searchBar = !this.searchBar;
    },
  },
})
export default class Research extends Vue {}
// v-input__slot grey lighten-3
</script>
