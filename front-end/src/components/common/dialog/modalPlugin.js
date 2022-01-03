import DeleteDialog from './DeleteDialog.vue'
import { createApp } from "vue";
import globalComponents from "@/plugins/globalComponents";
import NotificationDialog from "./NotificationDialog.vue";

function cleanup(mountId) {
  let el = document.getElementById(mountId)
  if (el) {
    document.body.removeChild(el)
  }
}

export default {
  install(Vue) {
    const $deleteConfirm = function openDeleteModal(params = {}) {
      return new Promise((resolve, reject) => {
        try {
          const mountId = 'delete-modal'
          const App = createApp(DeleteDialog, {
            open: true,
            title: params.title || '',
            description: params.description || '',
            deleteText: params.buttonText,
            onDelete() {
              resolve(true);
              cleanup(mountId)
            },
            onCancel() {
              resolve(false);
              cleanup(mountId)
            }
          })
          const modalDiv = document.createElement('div');
          modalDiv.id = mountId
          document.body.appendChild(modalDiv)

          App.use(globalComponents)
          App.mount(modalDiv);
        } catch (err) {
          reject(err)
        }
      })
    };

    const $confirm = function openModal(params = {}) {
      return new Promise((resolve, reject) => {
        try {
          const mountId = 'confirm-modal'
          const App = createApp(DeleteDialog, {
            open: true,
            title: params.title || '',
            description: params.description || '',
            type: 'primary',
            deleteText: params.buttonText || 'Ok',
            onDelete() {
              resolve(true);
            },
            onCancel() {
              resolve(false);
              cleanup(mountId)
            }
          })
          const modalDiv = document.createElement('div');
          modalDiv.id = mountId
          document.body.appendChild(modalDiv)
          App.use(globalComponents)
          App.mount(`#${mountId}`);

        } catch (err) {
          reject(err)
        }
      })
    }

    const $notifyDialog = function openModal(params = {}) {
      return new Promise((resolve, reject) => {
        try {
          const mountId = 'notify-dialog'
          const App = createApp(NotificationDialog, {
            open: true,
            type: params.type || 'success',
            title: params.title || '',
            description: params.description || '',
            confirmText: params.buttonText || 'Confirm',
            wrapperClass: params.wrapperClass || '',
            onClose() {
              resolve(false);
              cleanup(mountId)
            }
          })
          const modalDiv = document.createElement('div');
          modalDiv.id = mountId
          document.body.appendChild(modalDiv)
          App.use(globalComponents)
          App.mount(`#${mountId}`);

        } catch (err) {
          reject(err)
        }
      })
    }

    Vue.config.globalProperties.$confirm = $confirm
    Vue.config.globalProperties.$deleteConfirm = $deleteConfirm
    Vue.config.globalProperties.$notifyDialog = $notifyDialog
  }
}

