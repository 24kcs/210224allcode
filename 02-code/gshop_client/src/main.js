// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 引入router
import router from './router'
// 引入TypeNav组件,并注册成全局的公共组件
import TypeNav from './components/TypeNav'
// 引入store
import store from './store'
// 设置浏览器的控制台中默认不显示提示信息
Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
// 创建vue的实例对象,并挂载起来
new Vue({
  // 把组件内容进行渲染
  render: h => h(App),
  router,
  store
}).$mount('#app')

// render: function (createApp) {
//   return createApp(App)
// }
// render: function (h) {
//   return h(App)
// }
 
// render:  (h) =>{
//   return h(App)
// }
//  render:h=>h(App)