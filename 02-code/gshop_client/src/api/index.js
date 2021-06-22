// 专门写api接口的函数封装
// 引入ajax
import ajax from './ajax'
// 获取首页的三级分类的信息数据
export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')