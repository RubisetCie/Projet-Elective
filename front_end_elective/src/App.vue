<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/account">Account</router-link> |
    <router-link to="/delivery">Delivery</router-link> |
    <router-link to="/order">Order</router-link> |
    <router-link to="/order-history">OrderHistory</router-link> |
    <router-link to="/sponsorship">Sponsorship</router-link> |
    <router-link to="/notification">Notification</router-link> |
    <router-link to="/item">Item</router-link> |
    <router-link to="/menu">Menu</router-link> |
    <router-link to="/component">Component</router-link> |
    <router-link to="/statistic">Statistic</router-link> |
    <router-link to="/dashboard">Dashboard</router-link> |
    <router-link to="/logs">Logs</router-link> |
    <router-link to="/research">Research</router-link>
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
