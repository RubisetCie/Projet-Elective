<template>
  <v-row justify='center' style='margin: 80px'>
    <v-col cols='12' sm='8'>
      <v-form ref='form' lazy-validation>
        <v-card>
          <v-card-title class='cyan darken-1'>
            <span class='text-h5 white--text'>
              <v-text-field
                dark
                label='Nom du Menu'
                v-model='new_menu_name'
                required
                :rules='otherRules'
                class='text-h5'
              ></v-text-field>
              <v-text-field
                dark
                label="path de l'image"
                v-model='new_image_path'
                class='text-h5'
                :rules='otherRules'
                required
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
                <v-text-field
                  label='Element 1'
                  v-model='new_element1'
                  required
                  :rules='otherRules'
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-text-field
                  label='Element 2'
                  v-model='new_element2'
                  required
                  :rules='otherRules'
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-text-field
                  label='Element 3'
                  v-model='new_element3'
                  required
                  :rules='otherRules'
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-text-field
                  label='prix'
                  v-model='new_price'
                  required
                  :rules='otherRules'
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div class='d-flex justify-space-around' style='padding-bottom: 15px'>
            <v-btn outlined rounded text @click='validate()'> Valider </v-btn>
          </div>
        </v-card>
      </v-form>
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
      new_menu_name: null,
      new_image_path: null,
      new_element1: null,
      new_element2: null,
      new_element3: null,
      new_price: null,
    };
  },
  methods: {
    redirect(path) {
      if (this.$route.path !== path) {
        this.$router.push(path).catch();
      }
    },
    async validate() {
      this.redirect('/account');
      // this.$refs.form.validate();
      // if (
      //   this.new_menu_name != null
      //   && this.new_image_path != null
      //   && this.new_element1 != null
      //   && this.new_price != null
      // ) {
      //   this.data = {
      //     name: this.new_name,
      //     image: {
      //       url: this.new_image_path,
      //       name: 'dqz',
      //     },
      //     price: this.new_price,
      //     item: [
      //       this.new_element1,
      //       this.new_element2,
      //       this.new_element3,
      //     ],
      //   };
      //   // this.new_phoneNumber;
      //   this.postNewAccount(this.data);
      // }
    },
    async postNewAccount(data) {
      // const response = await axios.post('/user/', data);
      // if (response.status === 204) {
      //   this.redirect('/login');
      // }
    },
  },
})
export default class CreateMenu extends Vue {}
</script>
