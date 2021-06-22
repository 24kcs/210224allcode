// 构造函数MVVM-----Vue,options----配置对象
function MVVM (options) {
  // this就是vm
  // 把配置对象保存起来
  this.$options = options || {};
  // data 变量保存了data对象
  var data = this._data = this.$options.data;
  // 当前的vm对象保存到了变量me中
  var me = this;

  // 数据代理
  // 把data对象中所有的属性拿出来放在一个数组中,进行遍历,key是每一个属性, key---msg
  Object.keys(data).forEach(function (key) {
    // key========msg
    me._proxyData(key);
  });
  // 初始化计算属性
  this._initComputed();
  // 数据劫持---核心之一
  // data-----data,this---vm
  observe(data, this);
  // 核心之二
  // 进行模版解析操作,options.el----#app,this---->vm实例对象
  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  constructor: MVVM,
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },
  // 真正实现数据代理的方法
  _proxyData: function (key, setter, getter) {
    // 保存了一次当前的vm对象
    var me = this;
    setter = setter ||
      // 为me---vm实例对象添加msg属性
      Object.defineProperty(me, key, {
        // 该属性不能被删除
        configurable: false,
        // 可以被枚举/遍历
        enumerable: true,
        // 重写get方法
        get: function proxyGetter () {
          // me--- vm  vm._data['msg']---->return 哈哈,我又变帅了
          return me._data[key];
        },
        // 重写set方法
        set: function proxySetter (newVal) {
          // newVal 新的值  vm._data['msg']='新的值'
          me._data[key] = newVal;
        }
      });
  },

  _initComputed: function () {
    var me = this;
    var computed = this.$options.computed;
    if (typeof computed === 'object') {
      Object.keys(computed).forEach(function (key) {
        Object.defineProperty(me, key, {
          get: typeof computed[key] === 'function'
            ? computed[key]
            : computed[key].get,
          set: function () { }
        });
      });
    }
  }
};