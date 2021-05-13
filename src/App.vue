<!--
 * @Author: wch
 * @Date: 2021-05-09 22:48:35
 * @LastEditTime: 2021-05-12 11:28:29
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \react-demof:\JavaScript-Charles\开课吧30期全栈\第一课vue-router&vuex\my-styule1\src\App.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/add">add</router-link>
    </div>
    <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">async:{{ $store.state.counter }}</p>
    <p>{{ $store.getters.doubleCounter }}</p>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
