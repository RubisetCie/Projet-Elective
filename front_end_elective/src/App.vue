<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/account">Account</router-link> |
    <router-link to="/delivery">Delivery</router-link> |
    <router-link to="/order">Order</router-link> |
    <router-link to="/order-history">OrderHistory</router-link> |
    <router-link to="/about">Sponsorship</router-link> |
    <router-link to="/about">Notification</router-link> |
    <router-link to="/about">Item</router-link> |
    <router-link to="/about">Menu</router-link> |
    <router-link to="/about">Component</router-link> |
    <router-link to="/about">Statistic</router-link> |
    <router-link to="/about">Dashboard</router-link> |
    <router-link to="/about">Logs</router-link> |
    <router-link to="/about">Research</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
