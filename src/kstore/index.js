/*******
 * @Author: wch
 * @Date: 2021-05-10 00:25:08
 * @LastEditTime: 2021-05-10 01:10:38
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \react-demof:\JavaScript-Charles\开课吧30期全栈\第一课vue-router&vuex\my-styule1\src\kstore\index.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter(state) { // 计算剩余数量
      return state.counter * 2;
    }
  },
  modules: {
  }
})
