import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/routes.js'
import dashboardRoutes from '@/modules/dashboard/routes.js'

const routes = [
  ...authRoutes,
  ...dashboardRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { left: 0, top: 0 };
  },
})

export default router
