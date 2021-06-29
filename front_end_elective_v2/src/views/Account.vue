<template>
  <v-row justify='center' style='margin: 80px'>
    <v-col cols='12' sm='8'>
      <v-card>
        <v-card-title class='cyan darken-1'>
          <span class='text-h5 white--text'>
            <div v-if='seeMod === true'>
              {{ lastname }} {{ name }}
            </div>
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
              <v-list-item @click="redirect('/')">
                <v-list-item-title>Me déconecter</v-list-item-title>
              </v-list-item>
              <v-list-item @click="redirect('/')">
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
                <v-list-item-title> {{ email }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> {{ address }} </v-list-item-title>
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
                <v-btn outlined text @click='editCard()'> Modifier la carte </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-btn outlined text @click='editPassword()'> Modifier le Mot de passe </v-btn>
              </v-list-item-content>
            </v-list-item>

          </div>

        </v-list>
        <div v-if='editMod' class='d-flex justify-space-around' style='padding-bottom:15px'>
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

@Options({
  components: {},
  data: () => ({
    editMod: false,
    seeMod: true,
    name: 'Dutru',
    lastname: 'Micheline',
    phoneNumber: '06 62 72 49 06',
    email: 'micheline.dutru@example.com',
    address: '7 rue des margerites 78400 Chatou',
    billingNumber: '***********1242',
    new_name: 'Dutru',
    new_lastname: 'Micheline',
    new_phoneNumber: '06 62 72 49 06',
    new_email: 'micheline.dutru@example.com',
    new_address: '7 rue des margerites 78400 Chatou',
    new_billingNumber: '***********1242',
  }),
  methods: {
    redirect(path) {
      this.$router.push(path);
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
    validate() {
      this.seeMod = true;
      this.editMod = false;
      this.name = this.new_name;
      this.lastname = this.new_lastname;
      this.phoneNumber = this.new_phoneNumber;
      this.email = this.new_email;
      this.address = this.new_address;
    },
    editCard() {
      console.log('editer la carte');
    },
    editPassword() {
      console.log('editer le mot de passe');
    },
  },
})

export default class Account extends Vue {}
</script>
