import { hasToken } from '@/modules/auth/utils/tokenUtils';
import { error } from '@/components/common/NotificationPlugin/index'
import store from "@/store"
import i18n from "@/i18n.js";

const loginRoute = {
  path: '/login'
};

function redirectToLogin(next) {
  return next(loginRoute);
}


function userCanAccessRoute(route) {
  if (!route.meta?.requiresPermissionTo) {
    return true
  }

  return store.getters['auth/userCan'](route.meta.requiresPermissionTo)
}

/**
 * Middleware to check if user has the correct right to access a certain page.
 * Checks are performed based on route meta fields `meta: { requiresAuth: true, requiresPermissionTo?: {action_name} }`.
 * @param {object} router Vue router instance
 */
 export default function authMiddleware(router) {
  router.beforeEach(async (to, from, next) => {

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (!requiresAuth) {
      return next();
    }

    if (!hasToken()) {
      return redirectToLogin(next);
    }

    const isRouteAccesible = userCanAccessRoute(to)
    if (!isRouteAccesible) {
      error(i18n.t("Permission denied"))
      return next(from)
    }

    return next();
  });
}
