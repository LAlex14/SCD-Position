<template>
<span
  :class="{
      'rounded-md': !rounded,
      'rounded-full': rounded,
      'block w-full': block,
      'inline-flex': !block,
      'shadow-sm': !variant.includes('link'),
      [customClass]: customClass
  }"
  class="relative"
>
  <button
    v-bind="$attrs"
    :type="$attrs.type || 'button'"
    :disabled="disabled || loading"
    ref="button"
    class="base-button items-center justify-center border border-transparent font-medium focus:outline-none focus:ring-gray-600 focus:border-gray-600 transition ease-in-out duration-150"
    :class="{
      'rounded-md': !rounded,
      'rounded-full': rounded,
      'text-white bg-primary-500 hover:bg-primary-600 focus:border-primary-700 active:bg-primary-700': variant === 'primary',
      'text-white bg-green-500 hover:bg-green-600 focus:border-green-700 active:bg-green-700': variant === 'success',
      'text-primary-500 hover:text-primary-900': variant === 'primary-link',
      'text-green-500 hover:text-green-900': variant === 'green-link',
      'text-gray-500 hover:text-gray-900': variant === 'gray-link',
      'text-white bg-red-500 hover:bg-red-600 focus:border-red-700 active:bg-red-700': variant === 'danger' || variant === 'error',
      'text-red-500 hover:text-red-900': variant === 'danger-link',
      'text-primary-700 bg-primary-100 hover:bg-primary-50 focus:border-primary-300 active:bg-primary-200': variant === 'secondary',
      'text-red-700 border-red-300 hover:bg-red-50 focus:border-red-300 active:bg-red-400': variant === 'danger-secondary',
      'text-gray-500 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50': variant === 'white',
      'text-xs leading-4': size === 'xxs',
      'text-xs px-2.5 py-1.5 leading-4': size === 'xs',
      'text-sm px-3 py-2 leading-4': size === 'sm',
      'text-sm px-4 py-2 leading-5': size === 'md',
      'text-base px-6 py-2 leading-6': size === 'lg',
      'text-base px-8 py-3 leading-6': size === 'xl',
      'opacity-50 cursor-not-allowed': disabled || localLoading,
      'inline-flex': !block,
      'w-full flex justify-center': block,
    }"
  >
  <div
    v-if="localLoading"
    class="absolute flex w-full items-center justify-center"
  >
    <LoadingIcon :size="size"/>
  </div>

  <div
    class="flex flex-wrap items-center"
    :class="{'opacity-0': localLoading}"
  >
    <slot>
      {{ label }}
    </slot>
  </div>
</button>
</span>
</template>
<script>

import LoadingIcon from "@/components/common/buttons/LoadingIcon.vue";

export default {
  inheritAttrs: false,
  components: {
    LoadingIcon,
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary' // primary|secondary|error|danger|danger-secondary|white
    },
    size: {
      type: String,
      default: 'md' // xs|sm|md|lg|xl
    },
    customClass: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localLoading: false
    }
  },
  methods: {
    focus() {
      if (!this.$refs.button) {
        return
      }
      this.$refs.button.focus()
    }
  },
  watch: {
    loading: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.localLoading = false
          return
        }
        setTimeout(() => {
          if (this.loading) {
            this.localLoading = true
          }
        }, 200)
      }
    }
  }
}
</script>
