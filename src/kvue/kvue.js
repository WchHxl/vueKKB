/*******
 * @Author: wch
 * @Date: 2021-05-13 16:22:59
 * @LastEditTime: 2021-05-13 23:09:04
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \react-demof:\JavaScript-Charles\开课吧30期全栈\第一课vue-router&vuex\my-styule1\src\kvue\kvue.js
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


// 对象响应式 给一个obj定义一个响应式属性
function defineReactive(obj, key, val) {
  // 如果是对象，执行observe
  observe(val)
  // 创建Dep实例
  const deps = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key)
      // 依赖收集
      Dep.target && deps.addDep(Dep.target)
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
        deps.notify()
      }
    }
  })
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(newVal) {
        if (newVal !== vm.$data[key]) {
          vm.$data[key] = newVal
          // set一个对象
          // 视图更新
          // update()
        }
      }
    })
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
  }
  // Object.keys(obj).forEach(key => {
  //   defineReactive(obj, key, obj[key])
  // })
  new Observer(obj)
}

class Observer {
  constructor(obj) {
    // 判断类型
    if (Array.isArray(obj)) {
      // 数组的实现
    } else {
      this.walk(obj)
    }
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    if (this.$el) {
      this.compile(this.$el);
    }
  }
  // 遍历node，判断节点类型，做不同处理
  compile(node) {
    const childNodes = node.childNodes;
    // childNodes 不是个数组 是类数组 稳妥的话转化成数组
    Array.from(childNodes).forEach(el => {
      if (this.isElement(el)) {
        console.log('编译元素', el.nodeName)
        this.compileElement(el)
        // 递归 
        if (el.childNodes.length > 0) {
          this.compile(el);
        }
      } else if (this.isInter(el)) {
        console.log('编译文本', el.textContent)
        this.compileText(el)
      } else {
        
      }
    });
  }
  isElement(el) {
    return el.nodeType === 1
  }
  // 插值表达式判断 {{counter}}
  isInter(el) {
    return el.nodeType === 3 && /\{\{(.*)\}\}/.test(el.textContent)
  }
  // 编译{{counter}}
  compileText(el) {
    // 获取表达式
    // el.textContent = this.$vm[RegExp.$1]
    this.update(el, RegExp.$1, 'text')
  }
  // 编译元素，遍历所有特性，看是否是k-开头，或者@事件
  compileElement(el) {
    const attr = el.attributes
    Array.from(attr).forEach(attr => {
      // k-text = 'counter' name:k-vue value:counter
      const attrName = attr.name;
      const exp = attr.value;
      // 指令
      if (this.isDir(attrName)) {
        // k-text
        const dir = attrName.substring(2)
        this[dir] && this[dir](el, exp)
      }
      // 事件
      if (this.isEvent(attrName)) {
        // @click='handleClick'
        const dir = attrName.substring(1)
        // 事件监听
        this.eventHandler(el, exp, dir)
      }
    })
  }
  // k-text
  text(el, exp) {
    this.update(el, exp, 'text')
    // el.textContent = this.$vm[exp];
  }
  html(el, exp) {
    this.update(el, exp, 'html')
  }
  model(el, exp) {
    this.update(el, exp, 'model')
    el.addEventListener('input', e => {
      this.$vm[exp] = e.target.value
    })
  }
  textUpdater(el, val) {
    el.textContent = val;
  }
  htmlUpdater(el, val) {
    el.innerHTML = val;
  }
  modelUpdater(el, val) {
    el.value = val;
  }
  isDir(attrName) {
    return attrName.startsWith('k-')
  }
  isEvent(attrName) {
    return attrName.startsWith('@')
  }
  eventHandler(el, exp, dir) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp]
    el.addEventListener(dir, fn.bind(this.$vm))
  }
  update(el, exp, dir) {
    const fn = this[dir + 'Updater']
    fn && fn(el, this.$vm[exp])
    new Watcher(this.$vm, exp, val => {
      fn && fn(el, val)
    })
  }
}

class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm;
    this.key = key;
    this.updater = updater;

    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
  }

  // 被Dep调用
  update() {
    this.updater.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }
  // 参数dep就是Watcher实例
  addDep(dep) {
    this.deps.push(dep);
  }
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}

class KVue{
  constructor(options) {
    // 保存选项
    this.$options = options;
    this.$data = options.data;

    // 对data做响应式
    observe(this.$data)
    // 代理
    proxy(this)
    // 编译
    new Compile(options.el, this)
  }
}