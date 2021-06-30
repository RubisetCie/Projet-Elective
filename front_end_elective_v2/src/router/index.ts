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
    path: '/register',
    name: 'Inscription',
    component: () => import('../views/Register.vue'),
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
    path: '/menu/:id?',
    name: 'Menu',
    component: () => import('../views/Dishes.vue'),
  },
  {
    path: '/order',
    name: 'Commande',
    component: () => import('../views/Dishes.vue'),
  },
  {
    path: '/order-history',
    name: 'Commandes Terminées',
    component: () => import('../views/Dishes.vue'),
  },
  {
    path: '/dashboard',
    name: 'Tableau de bord',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/cart',
    name: 'Panier',
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/login',
    name: 'Connexion',
    component: () => import('../views/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
