/*******
 * @Author: wch
 * @Date: 2021-05-09 22:58:34
 * @LastEditTime: 2021-05-11 21:55:02
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \react-demof:\JavaScript-Charles\开课吧30期全栈\第一课vue-router&vuex\my-styule1\src\kRouter\kvue-router.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
// render函数h(home)直接可以解析组件并展示
// import Home from '../views/Home.vue'
let Vue;

class VueRouter{
  constructor(options) {
    this.$options = options
    // 数据响应式，current必须是响应式的，他变化，其组件也会重新render
    // 响应式两种
    // 1.借鸡生蛋：new Vue(data: {current: '/'})
    // 2.Vue.util.defineReactive(obj, 'current', '/')
    this.current = window.location.hash.slice(1) || '/'
    // Vue.util.defineReactive(this, 'current', this.current)
    Vue.util.defineReactive(this, 'matched', []);
    this.match();
    // 监控url
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
      this.matched = [];
      this.match()
    })
  }
  match(routes) {
    routes = routes || this.$options.routes;

    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route);
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
}

// 插件：实现install⽅法，注册$router
VueRouter.install = function (_vue) {
  // 引⽤构造函数，VueRouter中要使⽤ _vue,this是Vue实例 
  Vue = _vue;
  // 注册Vue实例
  // 通过全局混入  Vue.mixin({beforeCreate})
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
   })
  

  // 需要注册两个组件 router-link 和 router-view
  Vue.component('router-link', {
    // runtime-only模式下没有编译器 所以需要render函数
    // template: `<a>router-link</a>`
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      // <router-link to='/about'>xxx</router-link>
      // this.$slots.default 默认插槽的值
      // router-link 获取to的值 因为hash路由模式 所以拼接 '#' + this.to
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
      // jsx写法  不够灵活  需要对jsx的支持
      // return <a href = { '#' + this.to } > {this.$slots.default} </a>
    }
  })
  Vue.component('router-view', {
    // runtime-only模式下没有编译器 所以需要render函数
    // template: `<div>router-view</div>`
    render(h) {
      // <router-view />
      // return h(Home)
      this.$vnode.data.routerView = true;
      let depth = 0;
      let parent = this.$parent;
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData) {
          if (vnodeData.routerView) {
            depth++
          }
         }
        parent = parent.$parent
      }
      const { current, options } = this.$router;
      console.log(this.$router)
      console.log(depth)
      // const router = options.routes.find(res => {
      //   return res.path === current
      // })
      let router = this.$router.matched[depth];
      return h(router ? router.component : null)
    }
  })
  
}

export default VueRouter;