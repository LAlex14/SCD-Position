<template>
  <BaseDialog
    v-model="showModal"
    v-show="showModal"
  >
    <div class="sm:flex sm:items-start p-5">
      <div
          class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
          :class="{
            'bg-red-100': type === 'danger',
            'bg-yellow-100': type === 'warning',
            'bg-primary-100': type === 'primary',
          }"
      >
        <svg
          class="h-6 w-6"
          :class="{
            'text-red-600': type === 'danger',
            'text-yellow-600': type === 'warning',
            'text-primary-600': type === 'primary',
          }"
          stroke="currentColor" fill="none" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
          {{ title }}
        </h3>
        <div class="mt-2">
          <p class="text-sm leading-5 text-gray-500">
            {{ description }}
          </p>
        </div>
        <slot></slot>
      </div>
    </div>
    <div class="p-3 border-t border-gray-200">
      <div class="sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <base-button :variant="type === 'danger' ? 'danger' : 'primary'"
                        @click="onDeleteConfirmed">
            {{ deleteText }}
          </base-button>
        </span>
        <span class="flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <base-button variant="white"
                        ref="cancel"
                        @click="onClose">
            {{ cancelText }}
          </base-button>
        </span>
      </div>
    </div>
  </BaseDialog>
</template>

<script>
import i18n from "@/i18n";

export default {
  name: "DeleteDialog",
  inheritAttrs: false,
  props: {
    open: Boolean,
    title: {
      type: String,
      default: i18n.t('Delete Information'),
    },
    description: {
      type: String,
      default: i18n.t('Are you sure ? This will permanently remove the information you are about to delete.'),
    },
    deleteText: {
      type: String,
      default: i18n.t('Delete'),
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    type: {
      type: String,
      default: 'danger'
    },
    onDelete: {
      type: Function,
      default: () => ({})
    },
    onCancel: {
      type: Function,
      default: () => ({})
    }
  },
  emits: ['delete'],
  data() {
    return {
      showModal: this.open
    }
  },
  methods: {
    onDeleteConfirmed() {
      this.showModal = false
      this.$emit('delete')
      if (this.onDelete) {
        this.onDelete()
      }
    },
    onClose() {
      this.showModal = false
    },
    onCancelFinished() {
      this.$emit('cancel')
      if (this.onCancel) {
        this.onCancel()
      }
    },
    onAfterEnter() {
      if (!this.$refs.cancel) {
        return
      }
      this.$refs.cancel.focus()
    }
  },
  watch: {
    open(value) {
      this.showModal = value
    }
  }
}
</script>
