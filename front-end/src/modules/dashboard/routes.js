import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout.vue";
import NotFound from '@/modules/auth/pages/404.vue'
import Welcome from '@/modules/dashboard/pages/welcome.vue'
import CreatePosition from '@/modules/dashboard/pages/createPosition.vue';
import Positions from '@/modules/dashboard/pages/positions.vue';
import EditPosition from '@/modules/dashboard/pages/editPosition.vue';

function getAllModuleRoutes() {
  const files = import.meta.globEager('../**/routes.js')
  const exceptions = ['auth', 'dashboard'] // we don't want to include these modules here
  let fileKeys = Object.keys(files)
  fileKeys = fileKeys.filter(pathName => {
    return exceptions.every(exception => !pathName.includes(exception))
  })
  const flatRoutes = []
  fileKeys.forEach(key => {
    flatRoutes.push(...files[key].default)
  })
  return flatRoutes
}

const allModuleRoutes = getAllModuleRoutes()

export default [
  {
    path: '/',
    name: 'Welcome',
    redirect: '/welcome',
    components: {
      default: DashboardLayout
    },
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        title: 'Welcome',
        component: Welcome
      },
      {
        path: 'create-position',
        name: 'CreatePosition',
        title: 'Create Position',
        component: CreatePosition
      },
      {
        path: 'edit-position/:id?',
        name: 'EditPosition',
        title: 'Edit Position',
        component: EditPosition
      },
      {
        path: 'positions/:id?',
        name: 'ViewPositions',
        title: 'Positions',
        component: Positions
      },
      
      ...allModuleRoutes,
      {
        path: '/:pathMatch(.*)*',
        name: 'Not Found',
        component: NotFound
      },
    ]
  }
]
