<template>
  <BaseTooltip v-bind="$attrs">
    <i class="fas fa-info-circle relative bottom-1 left-1 text-gray-300 hover:text-gray-500 cursor-pointer"></i>

    <template #content>
      <div class="w-56" v-html="content">
      </div>
    </template>
  </BaseTooltip>
</template>
<script>
export default {
  name: 'BaseIconTooltip',
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
<style>
</style>
