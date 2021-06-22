// 引入Home
// import Home from '../pages/Home'
import Home from '@/pages/Home'
// 引入Search
import Search from '@/pages/Search'
// 引入Login
import Login from '@/pages/Login'
// 引入Register
import Register from '@/pages/Register'
// 暴露出去一个routes的数组
export default [
  // 注册Home路由组件
  {
    path: '/',
    component:Home
  },
  // 注册Search路由组件
  {
    path: '/search/:keyword?', // ? 代表的是参数可有可无,都不影响路由的跳转
    component: Search,
    name:'search'
  },
  // 注册Login路由组件
  {
    path: '/login',
    component: Login,
    meta: {
      isFooterHide:true
    }
  },
  // 注册Register路由组件
  {
    path: '/register',
    component: Register,
    meta: {
      isFooterHide:true
    }
  },
  // 重定向
  {
    path: '/',
    redirect:'/'
  }

]