import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Accueil',
    component: Home,
  },
  {
    path: '/account',
    name: 'Compte',
    component: () => import('../views/Account.vue'),
  },
  {
    path: '/delivery',
    name: 'Livraison',
    component: () => import('../views/Delivery.vue'),
  },
  {
    path: '/sponsorship',
    name: 'Parrainage',
    component: () => import('../views/Sponsorship.vue'),
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('../views/Notification.vue'),
  },
  {
    path: '/dishes',
    name: 'Plats',
    component: () => import('../views/Dishes.vue'),
  },
  {
    path: '/menus/:id?',
    name: 'Menus',
    component: () => import('../views/Dishes.vue'),
  },
  {
    path: '/order',
    name: 'Commande',
    component: () => import('../views/Dishes.vue'),
  },
  {
    path: '/order-history',
    name: 'Commande Terminée',
    component: () => import('../views/Dishes.vue'),
  },
  {
    path: '/statistic',
    name: 'Statistiques',
    component: () => import('../views/Statistic.vue'),
  },
  {
    path: '/dashboard',
    name: 'Tableau de bord',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import('../views/Logs.vue'),
  },
  {
    path: '/cart',
    name: 'Panier',
    component: () => import('../views/Cart.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
