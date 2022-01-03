import { camelCase, upperFirst } from 'lodash-es'
import { Form as VeeForm } from 'vee-validate'
import { TransitionRoot } from '@headlessui/vue'
const components = import.meta.globEager('../components/**/(Base|Icon)*.(vue|js)')

/**
 * This will require and make global all components starting with **Base** (e.g BaseButton, BaseInput etc) or **Icon** (e.g IconPhone)
 */
export default {
  install(Vue) {

    for (let filePath in components) {
      const componentName = upperFirst(
        camelCase(
          // Gets the file name regardless of folder depth
          filePath
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )
      const componentConfig = components[filePath]
      // Register component globally
      Vue.component(
        componentName,
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        componentConfig.default || componentConfig
      )
    }
    Vue.component('VeeForm', VeeForm)
    Vue.component('TransitionRoot', TransitionRoot)
  }
}

