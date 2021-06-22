<template>
  <div>
    <!--头部-->
    <Header/>
    <!--中间部分-->
    <router-view/>
    <!--底部-->
    <Footer v-if="!$route.meta.isFooterHide" />
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  }
}
</script>
<style lang="less" scoped>
</style>