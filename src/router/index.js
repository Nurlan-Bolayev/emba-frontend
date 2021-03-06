import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from '@/views/admin/AdminLogin';
import AdminDashboard from "@/views/admin/AdminDashboard";
import AdminCategories from "@/views/admin/AdminCategories";
import AdminProducts from "@/views/admin/AdminProducts";
import AddProduct from "@/views/admin/AddProduct";
import EditProduct from "@/views/admin/EditProduct";
import AddCategory from "@/views/admin/AddCategory";
import EditCategory from "@/views/admin/EditCategory";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/admin/login',
    component: AdminLogin,
  },

  {
    path: '/admin/dashboard',
    component: AdminDashboard,
  },

  {
    path: '/admin/categories',
    component: AdminCategories,
  },

  {
    path: '/admin/products',
    component: AdminProducts,
  },

  {
    path: '/admin/products/new',
    component: AddProduct,
  },

  {
    path: '/admin/categories/new',
    component: AddCategory,
  },

  {
    path: '/admin/categories/:id',
    component: EditCategory,
  },

  {
    path: '/admin/products/:id',
    component: EditProduct,
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
