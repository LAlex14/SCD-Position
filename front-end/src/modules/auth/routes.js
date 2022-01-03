import Login from './pages/login.vue'
import AuthLayout from "../auth/layout/AuthLayout.vue";
import { hasToken } from './utils/tokenUtils';

export default [
  {
    path: '/',
    components: {
      default: AuthLayout
    },
    redirect: hasToken() ? '/welcome' : '/login',
    meta: {
      productionReady: true,
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
    ]
  }
]