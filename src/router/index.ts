import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import {defineAsyncComponent} from "vue";
import {useTitle} from "@vueuse/core";
import {computed} from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/auth/:type',
      name: 'Auth',
      component: () => import('@/views/Authorize.vue'),
      meta: {
        title: '认证'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: '404 Not Found'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/Test.vue'),
      meta: {
        title: '测试'
      }
    }
  ]
})
router.afterEach((to, from) => {
  //设置title
  useTitle(to.meta.title + ' / QuickHome')
})

export default router
