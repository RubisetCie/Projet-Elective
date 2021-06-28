<template>
  <div class='HomeBar'>
    <v-card class='mx-auto overflow-hidden'>
      <v-app-bar color='deep-purple' dark>
        <v-app-bar-nav-icon @click='drawer = true'></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
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
            <v-list-item v-for='n in 5' :key='n' @click='() => {}'>
              <v-list-item-title>Option {{ n }}</v-list-item-title>
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
