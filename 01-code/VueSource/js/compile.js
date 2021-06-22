// 编译模版的构造函数
// el----->#app, vm----vm实例对象
function Compile (el, vm) {
  // 保存vm实例对象
  this.$vm = vm;
  // 判断el是不是标签,如果不是标签则el是一个选择器,根据选择器获取对应的标签节点--->id为app的div
  // $el---->div对象
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  // 判断div模版容器是否存在
  if (this.$el) {
    // 创建文档碎片对象,并把div容器中所有的节点全部的添加到文档碎片对象中
    this.$fragment = this.node2Fragment(this.$el);
    // 进行模版解析(初始化)
    this.init();
    // 编译后的文档对象重新添加到div容器中,模版解析结束了
    this.$el.appendChild(this.$fragment);
  }
}
// 原型对象
Compile.prototype = {
  // 构造器
  constructor: Compile,
  // 创建文档碎片对象,并把id为app的div中所有的节点放在文档碎片对象中
  node2Fragment: function (el) {
    // 创建文档碎片对象
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    // 返回文档碎片对象
    return fragment;
  },
  // 真正的模版解析(其实是假的)
  init: function () {
    // 才是真正的模版解析
    this.compileElement(this.$fragment);
  },
  // 模版解析,最开始的时候(第一次调用的时候el----文档碎片对象)
  compileElement: function (el) {
    // 文档碎片对象中所有的子节点
    var childNodes = el.childNodes,
      // me-----compile编译对象
      me = this;
    // 遍历所有的子节点
    [].slice.call(childNodes).forEach(function (node) {
      // 获取当前节点的文本内容
      var text = node.textContent;
      // 插值语法的正则表达式
      var reg = /\{\{(.*)\}\}/;
      // 判断当前的节点是不是标签
      if (me.isElementNode(node)) {
        // 标签节点开始解析
        me.compile(node);
        // 判断当前节点是不是文本节点,并且该节点是插值内容
      } else if (me.isTextNode(node) && reg.test(text)) {
        // node-----> {{msg}}   text-----> {{msg}}
        // RegExp.$1.trim()--->msg
        me.compileText(node, RegExp.$1.trim());
      }
      // 如果当前的节点中还有子节点,并且子节点确实存在,那么就继续递归的方式遍历节点
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },
  // 标签解析的方法
  compile: function (node) {
    // node----button按钮
    // 获取当前标签节点的所有的属性
    var nodeAttrs = node.attributes,
      me = this; // 编译对象
    // 遍历所有的属性
    [].slice.call(nodeAttrs).forEach(function (attr) {
      // 获取属性的名字
      var attrName = attr.name;
      // 判断当前的属性是不是指令(是不是v-开头)
      if (me.isDirective(attrName)) {
        // 获取属性的值(showName表达式)
        var exp = attr.value;
        // attrName---->v-on:click
        // dir---->on:click
        var dir = attrName.substring(2);
        // 判断是不是事件指令
        if (me.isEventDirective(dir)) {
          // node---button,me.$vm--->vm对象,exp---->showName, dir---->on:click
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
        // node---->button,此时把标签节点上所有的指令属性都移除
        node.removeAttribute(attrName);
      }
    });
  },
  // 文本编译
  // node----{{msg}}  exp----->msg
  compileText: function (node, exp) {
    // this.$vm---->vm
    compileUtil.text(node, this.$vm, exp);
  },
  // 判断是不是指令
  isDirective: function (attr) {
    return attr.indexOf('v-') == 0;
  },
  // 判断是不是事件指令
  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },
  // 判断是不是标签节点
  isElementNode: function (node) {
    return node.nodeType == 1;
  },
  // 判断是不是文本节点
  isTextNode: function (node) {
    return node.nodeType == 3;
  }
};

// 指令处理集合
var compileUtil = {
  // 插值语法的解析的方法
  // node----{{msg}}  vm--->vm   exp---->msg
  // v-text指令或者插值
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },
  // v-html
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },
  // v-model
  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model');

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener('input', function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },
  // v-class
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },
  // v-bind
  bind: function (node, vm, exp, dir) {
    // node---->{{msg}}  vm--->vm   exp--->msg  dir---->'text'
    var updaterFn = updater[dir + 'Updater'];
    // var updaterFn = updater['textUpdater'];
    // updaterFn--->textUpdater()
    // 判断当前的这个方法是否存在,如果存在则直接调用
    // node--->{{msg}} 
    //  this._getVMVal(vm, exp)---->msg属性的值
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    // updaterFn('{{msg}}', msg的值);
    // updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    // 创建监视对象
    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  // node----->button,vm,exp--->showName,dir---->on:click
  eventHandler: function (node, vm, exp, dir) {
    // eventType---->click
    var eventType = dir.split(':')[1],
      // 通过vm获取里面的methods对象中的showName函数
      // fn---->showName函数
      fn = vm.$options.methods && vm.$options.methods[exp];
    // 判断事件类型和回调函数是否都存在
    if (eventType && fn) {
      // 通过addEventListener方法为button绑定click,并且设置showName函数中的this的指向是vm对象
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  _getVMVal: function (vm, exp) {
    var val = vm;
    exp = exp.split('.');
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm;
    exp = exp.split('.');
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};

// 更新内容的对象
var updater = {
  // 插值语法的替换文本的方法
  // node---->{{msg}}  value--->哈哈,我又变帅了
  // v-text指令或者插值的
  textUpdater: function (node, value) {
    // {{msg}} 这个文本内容变成了 哈哈,我又变帅了--->内存中完成
    node.textContent = typeof value == 'undefined' ? '' : value;
  },
  // v-html
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },
  // v=class
  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, '').replace(/\s$/, '');

    var space = className && String(value) ? ' ' : '';

    node.className = className + space + value;
  },
  // v-model
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};