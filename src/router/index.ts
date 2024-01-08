import { createRouter, createWebHistory } from 'vue-router'
import {useTitle} from "@vueuse/core";
import Layout from "@/components/Layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/root',
      component: Layout,
      children: [
        {
          path: 'root',
          name: 'Root',
          component: () => import('@/views/Root.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/search',
          name: 'Search',
          component: () => import('@/views/Search.vue'),
          meta: {
            title: '搜索'
          }
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('@/views/userSetting/index.vue'),
          meta: {
            title: '个人设置'
          }
        },
        {
          path: '/home/detail',
          name: 'HomeDetail',
          component: () => import('@/views/home/detail.vue'),
          meta: {
            title: '房屋详情'
          }
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('@/views/order/index.vue'),
          meta: {
            title: '订单'
          }
        },
        {
          path: '/user/settings',
          name: 'UserSettings',
          component: () => import('@/views/userSetting/Layout.vue'),
          children: [
            {
              path: 'info',
              name: 'Info',
              component: () => import('@/views/userSetting/Info.vue'),
              meta: {
                title: '个人信息'
              }
            },
            {
              path: 'star',
              name: 'Star',
              component: () => import('@/views/userSetting/Star.vue'),
              meta: {
                title: '我的收藏'
              }
            },
            {
              path: 'coupons',
              name: 'Coupons',
              component: () => import('@/views/userSetting/Coupons.vue'),
              meta: {
                title: '优惠券'
              }
            },
            {
              path: 'travellers',
              name: 'Travellers',
              component: () => import('@/views/userSetting/Travellers.vue'),
              meta: {
                title: '旅客信息'
              }
            },
            {
              path: 'wallet',
              name: 'Wallet',
              component: () => import('@/views/userSetting/Wallet.vue'),
              meta: {
                title: '我的钱包'
              }
            },
            {
              path: 'orders',
              name: 'Orders',
              component: () => import('@/views/userSetting/Orders.vue'),
              meta: {
                title: '我的订单'
              }
            }
          ]
        },
      ]
    },
    {
      path: '/auth/:type',
      name: 'Auth',
      component: () => import('@/views/Authorize.vue'),
      meta: {
        title: '登录 / 注册'
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
    },
    {
      path: '/pay',
      name: 'Pay',
      component: () => import('@/views/Pay.vue'),
      meta: {
        title: '支付'
      }
    },
  ]
})
router.afterEach((to, from) => {
  //设置title
  const title = to.meta.title ? `${to.meta.title} / QuickHome` : `QuickHome`
  useTitle(title)
})

export default router
