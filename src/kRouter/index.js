/*******
 * @Author: wch
 * @Date: 2021-05-09 22:48:35
 * @LastEditTime: 2021-05-11 21:55:43
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \react-demof:\JavaScript-Charles\开课吧30期全栈\第一课vue-router&vuex\my-styule1\src\kRouter\index.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'
// use方法内部调用了install函数
Vue.use(VueRouter)

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
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    children: [{
      path: '/about/info',
      name: 'info',
      component: {
        render(h) {
          return h('div', '张三')
        }
      }
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
