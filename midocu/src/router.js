  import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Acerca from './views/Acerca.vue'
import PageNotFound from './views/PageNotFound.vue'

import { isAuthenticated } from '@/utils/auth'

const routes = [

{ path: '/', component: Login, meta: { requiresAuth: false } },
{ path: '/PageNotFound', component: PageNotFound, meta: { requiresAuth: false } },


  {
    path: '/',
    component: MainLayout,
    children: [
      
      { path: 'home', component: Home, meta: { requiresAuth: true } },
      { path: 'acerca', component: Acerca, meta: { requiresAuth: true },}
   
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: 'PageNotFound'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/')
  } else {
    next()
  }
})

export default router
