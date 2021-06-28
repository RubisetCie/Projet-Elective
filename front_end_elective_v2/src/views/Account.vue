<template>
  <v-row justify='center' style="margin:80px;">
    <v-col cols='12' sm='8'>
      <v-card>
        <v-card-title class='cyan darken-1'>
          <span class='text-h5 white--text'> {{ lastname }}  {{ name }} </span>

          <v-spacer></v-spacer>

          <v-btn dark icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn dark icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>06 62 72 49 06</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> {{ email }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                > {{ address }} </v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-credit-card</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> {{ billingNumber }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  components: {},
  data: () => ({
    name: 'Dutru',
    lastname: 'Micheline',
    email: 'micheline.dutru@example.com',
    address: '7 rue des margerites 78400 Chatou',
    billingNumber: '***********1242',
  }),
  methods: {},
})
export default class Account extends Vue {}
</script>
