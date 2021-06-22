// axios的二次封装
import axios from 'axios'
// 引入进度条的对象及样式
import Nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// 引入vue-router
// 引入vuex
// 引入element-ui
// 设置根路径及请求的超时时间
const ajax = axios.create({
  baseURL: '/api', // 请求地址的根路径
  timeout:20000 // 请求的超时时间
})
// 请求拦截器
ajax.interceptors.request.use(config => { 
  // 显示进度条
  Nprogress.start()
  return config
})
// 响应拦截器
ajax.interceptors.response.use(response => { 
  // 隐藏进度条
  Nprogress.done()
  return response.data
}, error => {
    // 隐藏进度条
    Nprogress.done()
    // 对错误进行处理
    // 中断错误信息
    // return new Promise(() => { })
    // 返回错误信息,外部可以处理也可以不处理
    return Promise.reject(error)
})
export default ajax