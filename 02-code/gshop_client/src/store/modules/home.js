// 引入api接口函数
import {reqBaseCategoryList } from '@/api'
const state = {
  baseCategoryList:[] // 三级分类信息的数据
}
const mutations = {
  // 修改三级分类信息的数据
  receive_base_category_list (state,baseCategoryList) {
    state.baseCategoryList = baseCategoryList
   }
}
const actions = {
  // 获取三级分类信息的数据
  async getBaseCategoryList ({ commit}) { 
    const result = await reqBaseCategoryList()
    if (result.code === 200) { 
      commit('receive_base_category_list',result.data)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}