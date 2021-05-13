/*******
 * @Author: wch
 * @Date: 2021-05-09 22:48:35
 * @LastEditTime: 2021-05-12 11:25:59
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \react-demof:\JavaScript-Charles\开课吧30期全栈\第一课vue-router&vuex\my-styule1\src\main.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import Vue from 'vue'
import App from './App.vue'

import router from './router'
// import router from './kRouter'

// import store from './store'
import store from './kstore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
