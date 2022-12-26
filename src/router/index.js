import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormView from '../views/FormView.vue'
import ListView from '../views/ListView.vue'
import FormshopView from '../views/FormshopView.vue'
import ListshopView from '../views/ListshopView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/form/:task_id?',
    name: 'form',
    component: FormView
  },
  {
    path: '/list',
    name: 'list',
    component: ListView
  },
  {
    path: '/form_shop/:item_id?',
    name: 'form_shop',
    component: FormshopView
  },
  {
    path: '/list_shop',
    name: 'list_shop',
    component: ListshopView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
