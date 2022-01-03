<template>
  <el-tooltip v-bind="$attrs"
              :open-delay="openDelay"
              :content="content ? content.toString() : ''"
              :placement="$attrs.placement || 'top'"
              :disabled="$attrs.disabled || (!content && !$slots.content)"
              :popper-options="{
                  gpuAcceleration: true,
                }"
  >
    <slot></slot>
    <template v-if="$slots.content"
              #content>
      <slot name="content"></slot>
    </template>
  </el-tooltip>
</template>
<script>
import { ElTooltip } from 'element-plus'

export default {
  name: 'BaseTooltip',
  inheritAttrs: false,
  props: {
    content: {
      type: [String, Number, Object, Boolean],
      default: '',
    },
    openDelay: {
      type: [String, Number],
      default: 300
    }
  },
  components: {
    ElTooltip,
  }
}
</script>
<style>
</style>
