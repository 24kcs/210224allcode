<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- <a href="###">登录</a> -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="">
        </a> -->
        <router-link class="logo" to="/" title="尚品汇">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: '' // 收集文本框中的数据
    }
  },
  // 写方法的
  methods: {
    // 按钮的点击事件的回调函数,跳转到search界面
    toSearch() {
      // 第一种方式:成功和失败的回调都写
      // this.$router.push('/search',()=>{},()=>{})
      // 第二种方式:只写一个成功的回调
      // this.$router.push('/search',()=>{})
      // 第三种方式:只写一个失败的回调
      // this.$router.push('/search',null,()=>{})
      // 第四种方式:使用.then和.catch
      // this.$router.push('/search').then(()=>{ }).catch(()=>{})
      // 只有.then是不行的
      // this.$router.push('/search').then(()=>{ })
      // 第五种方式:只有一个catch
      // this.$router.push('/search').catch(()=>{ })
      // 编程式路由:push和replace都会有这个错误
      // 以上都不好(终极解决方式在router目录中的index.js文件中)
      // this.$router.push('/search')
      // 路由跳转并传参
      // const keyword = this.keyword.trim()
      // if (keyword) {
      //   this.$router.push(`/search/${keyword}`)
      // } else {
      //   this.$router.push(`/search`)
      // }
      // params的方式进行路由传参并跳转,如果push方法中是以对象的方式进行书写,里面需要使用name属性(需要在注册路由的时候添加name属性)
      // params的方式
      // this.$router.push({name:'search',params:{keyword:this.keyword}})
      // query的方式
      // this.$router.push({path:'/search',query:{keyword:this.keyword}})
      // query的方式也可以在里面使用name的写法
      // this.$router.push({name:'search',query:{keyword:this.keyword}})
      // query和params两种方式不同的区别:地址栏中是否有?,如果有? 就是query的方式,如果是/就是params的方式

      const keyword = this.keyword.trim()
      if (keyword) {
        this.$router.push({ name: 'search', params: { keyword: this.keyword } })
      } else {
        this.$router.push({ name: 'search' })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>