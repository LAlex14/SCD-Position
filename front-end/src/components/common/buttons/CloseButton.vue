<template>
  <button
    type="button"
    class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
    aria-label="Close"
    v-bind="$attrs"
  >
    <LoadingIcon v-if="loading" />
    <svg
      v-else
      :class="{
        'h-4 w-4': size === 'sm',
        'h-6 w-6': size === 'md',
      }"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>
<script>
import LoadingIcon from "@/components/common/buttons/LoadingIcon.vue";

export default {
  components: {
    LoadingIcon,
  },
  props: {
    loading: Boolean,
    size: {
      type: String,
      default: 'md'
    }
  }
}
</script>
<style>
</style>
