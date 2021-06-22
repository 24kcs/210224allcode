// 劫持的构造函数
function Observer (data) {
  // 把vm中的data保存在劫持对象的data中
  this.data = data;
  // 开始劫持
  this.walk(data);
}
// 原型
Observer.prototype = {
  // 构造器
  constructor: Observer,
  // 劫持数据啦,data------vm的data
  walk: function (data) {
    // me---->劫持实例对象
    var me = this;
    // 遍历vm中data对象中所有的属性
    Object.keys(data).forEach(function (key) {
      // key---->msg,  data[key]---->data.msg----->空调有些热啊
      me.convert(key, data[key]);
    });
  },
  convert: function (key, val) {
    // this.data---->劫持对象的data,key---->msg,val----->空调有些热啊
    this.defineReactive(this.data, key, val);
  },
  // 这才是真正的数据劫持的具体操作方法
  defineReactive: function (data, key, val) {
    // 创建dep对象(id,sub数组)
    var dep = new Dep();
    // val是不是对象,如果是对象继续劫持,如果不是就算了
    var childObj = observe(val);
    // 把vm中data中的所有的属性添加到劫持对象的data对象上,重写get和set方法
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      // 如果有一天外面或者有些地方使用了vm.msg了(获取值),那么就会先进入到mvvm.js文件中的那个get中,就会进入到这里
      get: function () {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      // 如果有一天外面或者有些地方使用了vm.msg=值了(赋值),那么就会先进入到mvvm.js文件中的那个set中,就会进入到这里
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知订阅者
        dep.notify();
      }
    });
  }
};
// 开始劫持
// value---->data  vm
function observe (value, vm) {
  // 如果value中的数据不是对象,则就没有必要劫持了
  if (!value || typeof value !== 'object') {
    return;
  }
  // 真正的开始劫持的操作,value是对象
  return new Observer(value);
};


var uid = 0;

function Dep () {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};

Dep.target = null;