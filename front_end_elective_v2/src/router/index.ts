import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  }, {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: () => import('../views/Delivery.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
  },
  {
    path: '/order-history',
    name: 'OrderHistory',
    component: () => import('../views/OrderHistory.vue'),
  },
  {
    path: '/sponsorship',
    name: 'Sponsorship',
    component: () => import('../views/Sponsorship.vue'),
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('../views/Notification.vue'),
  },
  {
    path: '/item',
    name: 'Item',
    component: () => import('../views/Item.vue'),
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue'),
  },
  {
    path: '/component',
    name: 'Component',
    component: () => import('../views/Component.vue'),
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('../views/Statistic.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import('../views/Logs.vue'),
  },
  {
    path: '/research',
    name: 'Research',
    component: () => import('../views/Research.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
