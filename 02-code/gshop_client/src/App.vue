<template>
  <div>
    <!--头部-->
    <Header />
    <!--中间部分-->
    <router-view />
    <!--底部-->
    <Footer v-if="!$route.meta.isFooterHide" />
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'
// import {reqBaseCategoryList} from './api'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  // 页面渲染完毕后的生命周期
  async mounted() {
    // 下面的方式不好,麻烦
    // const url = `http://39.98.123.211/api/product/getBaseCategoryList`
    // const result = await axios.get(url)
    // console.log(result)
    // const result = await reqBaseCategoryList()
    // console.log(result)
    this.$store.dispatch('getBaseCategoryList')
  }
}
</script>
<style lang="less" scoped>
</style>