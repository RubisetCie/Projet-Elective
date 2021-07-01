<template>
  <v-row justify='center' style='margin: 80px'>
    <v-col cols='12' sm='8'>
      <v-card>
        <v-card-title class='cyan darken-1'>
          <span class='text-h5 white--text'>
            <div v-if='seeMod === true'>{{ userInfo.lastname }} {{ userInfo.firstname }}</div>
            <div v-if='editMod === true'>
              <v-text-field
                dark
                v-model='new_lastname'
                label='Nom'
                class='text-h5'
              ></v-text-field>
              <v-text-field
                dark
                v-model='new_name'
                label='Prénom'
                class='text-h5'
              ></v-text-field>
            </div>
          </span>

          <v-spacer></v-spacer>

          <v-btn dark icon @click='switchMod()' v-if='seeMod'>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-menu left bottom>
            <template v-slot:activator='{ on, attrs }'>
              <v-btn dark icon v-bind='attrs' v-on='on'>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click='switchMod()' v-if='seeMod'>
                <v-list-item-title>Modifier mon compte</v-list-item-title>
              </v-list-item>
              <v-list-item @click='switchMod()' v-if='editMod'>
                <v-list-item-title>Annuler</v-list-item-title>
              </v-list-item>
              <v-list-item @click='redirect("/")'>
                <v-list-item-title>Me déconnecter</v-list-item-title>
              </v-list-item>
              <v-list-item @click='redirect("/")'>
                <v-list-item-title>Supprimer mon compte</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>

        <v-list>
          <div v-if='seeMod === true'>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> {{ phoneNumber }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> {{ userInfo.email }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> {{ userInfo.address[0].address }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-credit-card</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{
                    "**** **** **** "
                    + userInfo.billing[0].number[userInfo.billing[0].number.length - 4]
                    + userInfo.billing[0].number[userInfo.billing[0].number.length - 3]
                    + userInfo.billing[0].number[userInfo.billing[0].number.length - 2]
                    + userInfo.billing[0].number[userInfo.billing[0].number.length - 1]
                  }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  Code parrainage : {{ sponsorship }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>

          <div v-if='editMod'>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-text-field v-model='new_phoneNumber'></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-text-field v-model='new_email'></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-text-field v-model='new_address'></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-credit-card</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-btn outlined text @click='editCard()'>
                  Modifier la carte
                </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-btn outlined text @click='editPassword()'>
                  Modifier le Mot de passe
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
        <div
          v-if='editMod'
          class='d-flex justify-space-around'
          style='padding-bottom: 15px'
        >
          <v-btn outlined rounded text @click='switchMod()'> Annuler </v-btn>
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
      editMod: false,
      seeMod: true,
      phoneNumber: '06 62 72 49 06',
      sponsorship: 'RX0013',
      new_name: null,
      new_lastname: null,
      new_phoneNumber: null,
      new_email: null,
      new_address: null,
      new_billingNumber: null,

      userId: null,

      userInfo: {
        username: 'dupontmark',
        usertype: 0,
        email: 'mark.dupont@yopmail.com',
        password: 'bcrypt',
        firstname: 'Dupont',
        lastname: 'Mark',
        address: [
          {
            country: 'France',
            zipcode: 75003,
            city: 'Paris',
            address: '42 rue du General de Gaule',
          },
        ],
        billing: [
          {
            number: '4242424242424242',
            crypto: '042',
            owner: 'Mohamed Belgacem',
          },
        ],
      },
    };
  },
  methods: {
    redirect(path) {
      this.$router.push(path).catch();
    },
    switchMod() {
      if (this.seeMod) {
        this.seeMod = false;
        this.editMod = true;
      } else {
        this.seeMod = true;
        this.editMod = false;
      }
    },
    async validate() {
      this.seeMod = true;
      this.editMod = false;
      this.userInfo.firstname = this.new_name;
      this.userInfo.lastname = this.new_lastname;
      this.phoneNumber = this.new_phoneNumber;
      this.userInfo.email = this.new_email;
      this.userInfo.address[0].address = this.new_address;
      this.userInfo.billing[0].number = this.new_billingNumber;

      const response = await axios.put('user/', {
        id: await this.userId,
        firstname: this.userInfo.firstname,
        lastname: this.userInfo.lastname,
        email: this.userInfo.email,
        address: this.userInfo.address,
        billing: this.userInfo.billing,
      });

      if (response.status === 200) {
        console.log('update');
      }
    },
    editCard() {
      console.log('editer la carte');
    },
    editPassword() {
      console.log('editer le mot de passe');
    },
    async queryAccount() {
      const response = await axios.get(`user/${this.userId}`);
      this.userInfo = response.data;
    },
    setDataforEdit() {
      this.new_name = this.userInfo.firstname;
      this.new_lastname = this.userInfo.lastname;
      this.new_phoneNumber = '06 62 72 49 06';
      this.new_email = this.userInfo.email;
      this.new_address = this.userInfo.address[0].address;
      this.new_billingNumber = this.userInfo.billing[0].number;
    },
  },
  async created() {
    this.setDataforEdit();
    this.userId = await this.$store.getters.getUser.userId;
    // this.queryResto();
  },
})
export default class Account extends Vue {}
</script>
