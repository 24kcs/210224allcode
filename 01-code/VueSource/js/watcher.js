// 构造函数
function Watcher (vm, expOrFn, cb) {
  // 存储回调函数
  this.cb = cb;
  // 存储vm对象
  this.vm = vm;
  // 存储表达式
  this.expOrFn = expOrFn;
  // 定义一个对象用来存储和depId相关的东西
  this.depIds = {};
  // 判断传入进来的表达式是不是一个函数
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    // 获取的是一个闭包中的函数
    this.getter = this.parseGetter(expOrFn.trim());
  }
  // value中实际上存储的就是msg表达式的值
  // this---->watcher对象
  this.value = this.get();
}

Watcher.prototype = {
  // 构造器
  constructor: Watcher,
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.get();
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // 把dep添加到watcher中,把watcher添加到dep中,建立关系
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 把watcher添加到了dep中
      // dep.subs.push(watcher)---->subs---数组--->[watcher]
      dep.addSub(this);
      // 把dep保存到了watcher中
      // watcher.depIds[0]=dep
      // watcher对象中 depIds={0:dep}
      this.depIds[dep.id] = dep;
    }
  },
  // 获取msg属性值
  get: function () {
    // 把watcher对象保存在target属性中
    Dep.target = this;
    var value = this.getter.call(this.vm, this.vm);
    // 清理掉
    Dep.target = null;
    // 返回的是msg这个属性值
    return value;
  },

  parseGetter: function (exp) {
    // 表达式是否有意义
    if (/[^\w.$]/.test(exp)) return;
    // 把表达式中间的.切掉, 放在一个数组中
    // msg----->exps----->[msg]
    // exp--->car.msg---->[car,msg]
    var exps = exp.split('.');

    return function (obj) {
      // 此时obj---->vm对象
      // 推荐遍历数组的代码的写法
      for (var i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        // obj = vm['msg']--->obj=vm.msg--->obj中存储的是msg属性的值
        obj = obj[exps[i]];
      }
      // 返回这个值
      return obj;
    }
  }
};











// 为什么实例对象的方法要放在原型对象中

// function Person (name) { 
//   // 属性
//   this.name = name
//   // 方法
//   this.sayHi = function () { 
//     console.log('啊捏哈涩呦')
//   }
// }
// Person.prototype.eat = function () { 
//   console.log('豪哥喜欢吃榴莲沾臭豆腐汁和生吃大蒜')
// }
// // // 实例化
// // var per = new Person()
// // 实例化的同时并初始化
// var per1 = new Person('小明')
// var per2 = new Person('小明')
// per1.sayHi()
// per2.sayHi()
// console.log(per1 === per2)
// console.log(per1.sayHi === per2.sayHi)
// per1.eat()
// per2.eat()
// console.log(per1 === per2)
// console.log(per1.eat===per2.eat)


