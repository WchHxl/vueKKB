/*******
 * @Author: wch
 * @Date: 2021-05-10 00:25:25
 * @LastEditTime: 2021-05-11 22:17:48
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \react-demof:\JavaScript-Charles\开课吧30期全栈\第一课vue-router&vuex\my-styule1\src\kstore\kvuex.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
let Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    this._getters = options.getters

    const computed = {}
    this.getters = {}
    const that = this
    Object.keys(this._getters).forEach(key => {
      // 获取用户定义的getter
      const fn = that._getters[key]
      // 转换为computed可以使用无参数形式
      computed[key] = function () {
        return fn(that.state)
      }
      console.log(that)
      console.log(key)
      Object.defineProperty(that.getters, key, {
        get: () => that._vm[key]
      })
    })
    // 响应式处理
    // this.state = new Vue({
    //   data: options.state
    // })
    // setInterval(() => {
    //   this.state.counter ++
    // }, 1000);
    this._vm = new Vue({
      data: {
        // $$vue就不会代理
        $$state: options.state
      },
      computed
    })
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('请使用replaceState重置状态')
  }
  // 修改状态
  commit(type, payload) {
    const mutation = this._mutations[type]
    if (!mutation) {
      console.error('mutation不存在')
      return
    }
    console.log(mutation)
    mutation(this.state, payload)
  }

  dispatch(type, payload) {
    const actions = this._actions[type]
    console.log(actions)
    if (!actions) {
      console.error('actions不存在')
      return
    }
    console.log(actions)
    actions(this, payload)
  }
  
}


function install(_vue) {
  Vue = _vue;
  
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {Store, install};