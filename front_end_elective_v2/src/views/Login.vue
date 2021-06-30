<template>
  <div class='login'>
    <v-card style='margin: 80px; margin-left: 200px; margint-right:200px;'>
      <div v-if='know'>
        <v-list>
          <div>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-account</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-text-field label='Identifiant'></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-text-field label='Mot de passe'></v-text-field>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
        <v-row
          align='center'
          justify='space-around'
          style='padding-bottom: 15px'
        >
          <div class='my-2'>
            <v-btn x-small color='blue' @click='know = false'>
              Mot de passe oublier
            </v-btn>
          </div>
        </v-row>
        <div class='d-flex justify-space-around' style='padding-bottom: 15px'>
          <v-btn outlined rounded text @click='validate()'>
            Valider
          </v-btn>
        </div>
        <v-row
          align='center'
          justify='space-around'
          style='padding-bottom: 15px'
        >
          <div class='my-2'>
            <v-btn x-small color='blue' @click='redirect("/register")'>
              Créer un compte
            </v-btn>
          </div>
        </v-row>
      </div>
      <div v-else>
        <forgottenPassword />
        <div class='d-flex justify-space-around' style='padding-bottom: 15px'>
          <v-btn outlined text @click='changePassword()'> Valider </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import forgottenPassword from '../components/UI/Login/forgottenPassword.vue';

axios.defaults.baseURL = 'http://localhost:3000';

@Options({
  data() {
    return {
      know: true,
      new_password: null,
      userEmail: null,
    };
  },
  components: {
    forgottenPassword,
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    async validate() {
      const response = await axios.get(`/user/${this.userEmail}}`);
      if (response.data.password) {
        const pswv = await bcrypt.compare(this.new_password, response.data.password);

        if (pswv) {
          this.$store.dispatch('fetchProfil', { loginStatus: true, userId: response.data.id, usertype: response.data.usertype });
          this.$router.push('/');
        }
      }
    },
    changePassword() {
      this.know = true;
    },
  },
})
export default class Login extends Vue {}
</script>
