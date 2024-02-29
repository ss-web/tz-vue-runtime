import { createRouter, createWebHistory } from 'vue-router'
import ClientView from '../views/ClientView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'client',
      component: ClientView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    }
  ]
})

export default router
