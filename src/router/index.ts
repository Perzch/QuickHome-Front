import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import {defineAsyncComponent} from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auth/:type',
      name: 'Auth',
      component: (() => import('@/views/Authorize.vue'))
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: (() => import('@/views/NotFound.vue'))
    }
  ]
})

export default router
