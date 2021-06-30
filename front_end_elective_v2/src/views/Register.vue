<template>
  <v-row justify='center' style='margin: 80px'>
    <v-col cols='12' sm='8'>
      <v-card>
        <v-card-title class='cyan darken-1'>
          <span class='text-h5 white--text'>
              <v-text-field
                dark
                label='Nom'
                v-model='new_name'
                class='text-h5'
              ></v-text-field>
              <v-text-field
                dark
                label='Prénom'
                v-model='new_lastname'
                class='text-h5'
              ></v-text-field>
          </span>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field label='Numéro de téléphone' v-model='new_phoneNumber'></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field label='Email' v-model='new_email'></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field label='Mot de passe'>
              </v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field  label='Confirmer mot de passe' v-model='new_password'></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field  label='Addresse' v-model='new_address'></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field  label='Code parrainage'></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-credit-card</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-btn outlined text @click='editCard()'>
                Ajouter une carte
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div
          class='d-flex justify-space-around'
          style='padding-bottom: 15px'
        >
          <v-btn outlined rounded text @click='validate()'> Valider </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'localhost:3000';

@Options({
  components: {},
  data() {
    return {
      new_name: null,
      new_lastname: null,
      new_phoneNumber: null,
      new_email: null,
      new_address: null,
      new_password: null,
    };
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    async validate() {
      // this.new_name;
      // this.new_lastname;
      // this.new_phoneNumber;
      // this.new_email;
      // this.new_address;
      this.redirect('/account');
    },
  },
  async created() {
    this.setDataforEdit();
    // this.queryResto();
  },
})
export default class Account extends Vue {}
</script>
