<template>
  <div>
      <v-list>
        <div>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field label='Mot de passe'></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field label='Valider mot de passe'></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
  </div>
</template>

<script lang='ts'>
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  methods: {},
})
export default class forgottenPassword extends Vue {}
</script>
