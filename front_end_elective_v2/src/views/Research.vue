<template>
  <div class="research">
    <v-text-field
            label="Solo"
            single-line
            solo
          ></v-text-field>
  <div v-if="result">

  </div>

  </div>
</template>

<script lang="ts">
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  components: {

  },
  data() {
    return {
      data: Array,
    };
  },
  methods: {
    search() {
      return 0;
    },
  },
})
export default class Research extends Vue {}
// v-input__slot grey lighten-3
</script>
