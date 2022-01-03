import { Store } from 'vuex'
import { createStore } from 'vuex-extensions'
import createPersistedState from "vuex-persistedstate";

function getStoreModules() {
  const files = import.meta.globEager('../**/store/*Module.js')
  const fileKeys = Object.keys(files)
  const modules = {}
  fileKeys.forEach(key => {
    if (!files[key]) {
      return
    }

    const storeModule = files[key].default
    const pathParts = key.split('/')
    const fileName = pathParts[pathParts.length - 1]
    const moduleName = fileName.replace('Module.js', '')
    if (storeModule) {
      modules[moduleName] = storeModule
    }
  })
  return modules
}

export default createStore(Store, {
  plugins: [
    createPersistedState({
      paths: ['auth']
    })
  ],
  modules: {
    ...getStoreModules()
  }
})
