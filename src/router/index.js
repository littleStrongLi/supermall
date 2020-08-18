import Vue from 'vue'
import vueRouter from 'vue-router'

//配置懒加载
const Home = ()=> import('views/home/Home')
const Cart = ()=> import('views/cart/Cart')
const Category = ()=> import('views/category/Category')
const Profile = ()=> import('views/profile/Profile')

//1.安装插件
Vue.use(vueRouter)

//2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/cadegory',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new vueRouter({
  routes,
  mode: 'history'
})

//3.导出router
export default router
