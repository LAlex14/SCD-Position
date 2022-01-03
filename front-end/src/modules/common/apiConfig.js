import axios from 'axios';
import config from './config';
import AuthService from '@/modules/auth/services/AuthService';
import apiCache from "@/modules/common/utils/apiCache.js";;
import { notifications, notify } from '@/components/common/NotificationPlugin/index';
import router from '@/router';

export const statusCodesToHandle = [400, 401, 422];

export function setEnvUrl() {
  axios.defaults.baseURL = config.API_HOST
}

setEnvUrl()

export function successInterceptor(response) {
  const { url, method } = response.config

  if (method === 'get') {
    return response.data
  }
  const urlParts = url.split('/').filter(p => p !== '')
  let entity = ''
  // The url structure for the api requests is usually `/restify/{entity}`
  if (urlParts.length > 1 && urlParts[0] === 'restify') {
    entity = urlParts[1]
  }
  const methodsToClearCache = ['post', 'put', 'patch', 'delete']
  if (entity && methodsToClearCache.includes(method)) {
    apiCache.removeForEntity(entity)
  }

  return response.data;
}

function isUnauthorized(status) {
  const isOnSecuredRoute = router.currentRoute.matched.some(record => record.meta.requiresAuth)

  return status === 401 && isOnSecuredRoute
}

function isForbidden(status) {
  return status === 403
}

function isInternalServerError(status) {
  return status === 500
}

export async function errorInterceptor(error) {
  // Happens for cancelled requests using axios CancelTokenSource
  if (!error.response) {
    return Promise.reject(error);
  }

  if (error.config?.onerror) {
    return error.config.onerror(error)
  }

  const { status } = error.response;
  let errors = '';

  if (statusCodesToHandle.includes(status)) {
    errors = mapErrors(error.response.data);
    if (errors === 'Unauthenticated.') {
      errors = 'Your session expired. Please login in again to use the application'
    }
    if (notifications.state.length === 0) {
      notify({ type: 'danger', message: errors, once: true });
      error.handled = true
    }
  }

  if (isForbidden(status)) {
    errors = 'You are not allowed to perform this action';
    if (notifications.state.length === 0) {
      notify({ type: 'danger', message: errors, once: true });
      error.handled = true
    }
  }

  if (isInternalServerError(status)) {
    errors = 'A server error occurred during request execution';
    if (notifications.state.length === 0) {
      notify({ type: 'danger', message: errors, once: true });
      error.handled = true
    }
  }

  error.errors = errors;
  error.status = status;

  if (isUnauthorized(status)) {

    AuthService.logout();
    await router.push('/login');

    return Promise.reject(error);
  }
  return Promise.reject(error);
}

export function requestInterceptor(config) {
  const token = AuthService.getToken();

  config.headers.Accept = 'application/vnd.api+json'

  if (!config.headers['Authorization'] && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}

function mapErrors(data) {
  let errors = '';

  if (!data.errors && data.message || data.messages) {
    return data.message || data.messages[0]
  }
  if (Array.isArray(data.errors)) {
    const hasStringErrors = typeof data.errors[0] === 'string'

    if (hasStringErrors) {
      return data.errors[0]
    }

    data.errors = data.errors[0]
  }
  for (let err in data.errors) {
    let errorRow = data.errors[err].join('</br>');
    if (!errorRow.endsWith('</br>')) {
      errorRow += '</br>';
    }
    errors += errorRow;
  }
  return errors;
}

axios.interceptors.response.use(successInterceptor, errorInterceptor);
axios.interceptors.request.use(requestInterceptor);
