/*******
 * @Author: wch
 * @Date: 2021-05-11 22:59:15
 * @LastEditTime: 2021-05-13 22:52:58
 * @LastEditors: your name
 * @Description: Object.defineProperty()
 * @FilePath: \react-demof:\JavaScript-Charles\开课吧30期全栈\第一课vue-router&vuex\my-styule1\src\kvue\01-reactive.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
// 数组的响应式
const orginalProto = Array.prototype;
// 备份一下
const arrayProto = Object.create(orginalProto);
['push', 'pop', 'shift', 'unshift'].forEach(method => {
  arrayProto[method] = function (params) {
    orginalProto[method].apply(this, arguments)
    console.log('数组执行' + method + '操作');
  }
})


// 给一个obj定义一个响应式属性
function defineReactive(obj, key, val) {
  // 如果是对象，执行observe
  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key)
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        val = newVal
        // set一个对象
        observe(val)
        // 视图更新
        // update()
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  if (Array.isArray(obj)) {
    obj.__proto__ = arrayProto;
    Object.keys(obj).forEach((v, i) => {
      observe(obj[i])
    })
  } else {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 1
  },
  f: [1,2,3]
}
observe(obj)
obj.c = {
  d: 2
}
obj.c.d
set(obj, 'e', 3)
obj.e
obj.f.push(4)
