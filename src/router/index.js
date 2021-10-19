import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () =>
  import ('../views/home/Home.vue')
const Category = () =>
  import ('../views/category/Category')
const Cart = () =>
  import ('../views/cart/Cart')
const Profile = () =>
  import ('../views/profile/Profile')
const Detail = () =>
  import ('../views/detail/Detail')

//1. 安装插件
Vue.use(VueRouter)

//2. 创建路由对象(router)
const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes

})

//3. 导出
export default router