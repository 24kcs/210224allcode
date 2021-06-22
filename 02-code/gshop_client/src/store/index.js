// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'
import modules from './modules'
// 声明使用Vuex
Vue.use(Vuex)
// 实例化Vuex.Store并暴露出去
export default new Vuex.Store({
  // state, // 总的state 
  // mutations, // 总的mutations
  // actions, // 总的actions
  // getters, // 总的getters
  // 模块化的方式
  modules
})