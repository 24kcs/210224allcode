// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 声明使用vue-router插件
Vue.use(VueRouter)
// 改造push和replace的方法
const originPush = VueRouter.prototype.push
// 重写这个方法
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) { 
  return  originPush.call(this,location, onComplete, onAbort)
}
const originReplace = VueRouter.prototype.replace
// 重写这个方法
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originReplace.call(this, location, onComplete, onAbort)
}
// 实例化路由器对象并暴露出去
const router = new VueRouter({
  mode: 'history',
  routes
})
export default router


// function Person () { }
// Person.prototype.sayHi = function () { }
// var per = new Person()
// per.sayHi()