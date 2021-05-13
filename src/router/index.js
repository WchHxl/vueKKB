/*******
 * @Author: wch
 * @Date: 2021-05-09 22:48:35
 * @LastEditTime: 2021-05-13 15:31:04
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \react-demof:\JavaScript-Charles\开课吧30期全栈\第一课vue-router&vuex\my-styule1\src\router\index.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
const add = {
  render(h) {
    return h('div', '123123')
  }
}
const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/add',
    name: add,
    component: add
  }
]

const router = new VueRouter({
  routes
})

export default router
