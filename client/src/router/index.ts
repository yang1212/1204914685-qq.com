import { createRouter, createWebHistory } from 'vue-router'

// 开启历史模式
const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('../views/Home.vue')
        },
        {
          path: '/chart',
          component: () => import('../views/Chart.vue')
        },
        {
          path: '/listDetail',
          component: () => import('../views/listDetail.vue')
        }
      ]
    }
  ]
})

export default router