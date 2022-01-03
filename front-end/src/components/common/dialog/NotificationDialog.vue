<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showModal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" @click="onClose" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          :class="wrapperClass"
          role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
            <svg
                v-if="type === 'success'"
                class="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <svg v-if="type === 'info'"
                 data-v-4c034fe6="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="icon-svg feather feather-info text-blue-500 h-12 w-12">
              <circle data-v-4c034fe6="" cx="12" cy="12" r="10"></circle>
              <line data-v-4c034fe6="" x1="12" y1="16" x2="12" y2="12"></line>
              <line data-v-4c034fe6="" x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <svg v-if="type === 'warning'"
                 class="fill-current text-yellow-400"
                 xmlns="http://www.w3.org/2000/svg" id="Capa_1" x="0px" y="0px" viewBox="0 0 486.463 486.463">
              <g>
                <path d="M243.225,333.382c-13.6,0-25,11.4-25,25s11.4,25,25,25c13.1,0,25-11.4,24.4-24.4    C268.225,344.682,256.925,333.382,243.225,333.382z"/>
                <path d="M474.625,421.982c15.7-27.1,15.8-59.4,0.2-86.4l-156.6-271.2c-15.5-27.3-43.5-43.5-74.9-43.5s-59.4,16.3-74.9,43.4    l-156.8,271.5c-15.6,27.3-15.5,59.8,0.3,86.9c15.6,26.8,43.5,42.9,74.7,42.9h312.8    C430.725,465.582,458.825,449.282,474.625,421.982z M440.625,402.382c-8.7,15-24.1,23.9-41.3,23.9h-312.8    c-17,0-32.3-8.7-40.8-23.4c-8.6-14.9-8.7-32.7-0.1-47.7l156.8-271.4c8.5-14.9,23.7-23.7,40.9-23.7c17.1,0,32.4,8.9,40.9,23.8    l156.7,271.4C449.325,369.882,449.225,387.482,440.625,402.382z"/>
                <path d="M237.025,157.882c-11.9,3.4-19.3,14.2-19.3,27.3c0.6,7.9,1.1,15.9,1.7,23.8c1.7,30.1,3.4,59.6,5.1,89.7    c0.6,10.2,8.5,17.6,18.7,17.6c10.2,0,18.2-7.9,18.7-18.2c0-6.2,0-11.9,0.6-18.2c1.1-19.3,2.3-38.6,3.4-57.9    c0.6-12.5,1.7-25,2.3-37.5c0-4.5-0.6-8.5-2.3-12.5C260.825,160.782,248.925,155.082,237.025,157.882z"/>
              </g>
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 v-html="title" class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
            </h3>
            <div class="mt-2" v-if="description">
              <p v-html="description" class="text-sm text-gray-500" />
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 flex justify-center">
          <base-button variant="primary"
                       class="py-3"
                       size="sm"
                       block
                       @click="onClose">
          <span class="whitespace-nowrap">
            {{ confirmText }}
          </span>
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "@/i18n";

export default {
  name: "NotificationDialog",
  inheritAttrs: false,
  props: {
    open: Boolean,
    title: {
      type: String,
      default: i18n.t('Success'),
    },
    description: {
      type: String
    },
    type: {
      type: String,
      default: 'success'
    },
    wrapperClass: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: i18n.t('Confirm'),
    },
    onClose: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      showModal: this.open
    }
  },
  methods: {
    onClose() {
      if (this.onClose) {
        this.onClose()
      }
      this.showModal = false
    }
  },
  watch: {
    open(value) {
      this.showModal = value
    }
  }
}
</script>
