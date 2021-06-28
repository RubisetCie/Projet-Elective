<template>
  <div class='HomeBar'>
    <v-card class='mx-auto overflow-hidden'>
      <v-app-bar color='deep-purple' dark>
        <v-app-bar-nav-icon @click='drawer = true'></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-badge color='green' content='6'>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu left bottom>
          <template v-slot:activator='{ on, attrs }'>
            <v-btn icon v-bind='attrs' v-on='on'>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click='redirect("/account")'>
              <v-list-item-title>Mon compte</v-list-item-title>
            </v-list-item>
            <v-list-item @click='redirect("/")'>
              <v-list-item-title>Connexion</v-list-item-title>
            </v-list-item>
            <v-list-item @click='redirect("/")'>
              <v-list-item-title>Inscription</v-list-item-title>
            </v-list-item>
            <v-list-item @click='redirect("/dashboard")'>
              <v-list-item-title>Tableau de bord</v-list-item-title>
            </v-list-item>
            <v-list-item @click='redirect("/statistic")'>
              <v-list-item-title>Statistiques</v-list-item-title>
            </v-list-item>
            <v-list-item @click='redirect("/logs")'>
              <v-list-item-title>Logs</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer v-model='drawer' absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model='group'
            active-class='deep-purple--text text--accent-4'
          >
            <v-list-item @click='redirect("/")'>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Acceuil</v-list-item-title>
            </v-list-item>

            <v-list-item @click='redirect("/order")'>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Commandes</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Options from 'vue-class-component';
import Vue from 'vue';

@Options({
  components: {},
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
  },
})
export default class HomeBar extends Vue {}
</script>
