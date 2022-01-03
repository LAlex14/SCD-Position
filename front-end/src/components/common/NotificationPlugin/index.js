import { reactive } from 'vue'
import Notifications from './Notifications.vue';

const NotificationStore = {
  state: [], // here the notifications will be added
  settings: {
    overlap: true,
    verticalAlign: 'top',
    horizontalAlign: 'right',
    type: 'info',
    timeout: 5000,
    closeOnClick: true,
    showClose: true
  },
  removeNotification
};
const store = reactive(NotificationStore)

function setOptions(options) {
  store.settings = Object.assign(store.settings, options);
}

function removeNotification(timestamp) {
  const indexToDelete = store.state.findIndex(n => n.timestamp === timestamp);
  if (indexToDelete !== -1) {
    store.state.splice(indexToDelete, 1);
  }
}

function addNotification(notification) {
  if (typeof notification === 'string' || notification instanceof String) {
    notification = { message: notification };
  }
  notification.timestamp = new Date();
  notification.timestamp.setMilliseconds(
    notification.timestamp.getMilliseconds() + store.state.length
  );
  notification = Object.assign({}, store.settings, notification);
  store.state.push(notification);
}

function _notify(notification) {
  if (Array.isArray(notification)) {
    notification.forEach(notificationInstance => {
      addNotification(notificationInstance);
    });
  } else {
    addNotification(notification);
  }
}

const NotificationType = {
  Error: 'danger',
  Warning: 'warning',
  Success: 'success'
}

const methods = {
  notify: _notify,
  error(notification) {
    if (notification !== 'object') {
      notification = {
        message: notification,
      }
    }
    notify({
      type: NotificationType.Error,
      ...notification,
    })
  },
  warning(notification) {
    if (notification !== 'object') {
      notification = {
        message: notification,
      }
    }
    notify({
      type: NotificationType.Warning,
      ...notification,
    })
  },
  success(notification) {
    if (notification !== 'object') {
      notification = {
        message: notification,
      }
    }
    notify({
      type: NotificationType.Success,
      ...notification,
    })
  }
}

const NotificationsPlugin = {
  install(Vue, options) {
    Object.keys(methods).forEach(method => {
      Vue.config.globalProperties[`$${method}`] = methods[method]
    })
    Vue.config.globalProperties.$notifications = store

    Vue.component('Notifications', Notifications);
    if (options) {
      NotificationStore.setOptions(options);
    }
  }
};

export const error = methods.error
export const success = methods.success
export const warning = methods.warning
export const notify = methods.notify
export const notifications = store

export default NotificationsPlugin;
