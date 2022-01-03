<template>
  <div :class="$attrs.class">
    <slot v-if="!showTooltip"></slot>
    <p v-if="help" class="text-sm text-gray-500">{{ help }}</p>
    <div v-if="!showTooltip"
         :class="{'min-h-error mb-1 mt-0.5': !showTooltip}"
    >
      <div>
        <p :key="error" class="text-xs leading-none text-red-600">{{ error }}</p>
      </div>
    </div>
    <template v-if="showTooltip">
      <template v-if="error">
        <base-tooltip placement="top-start"
                      :content="error"
                      :hide-after="3000"
                      popper-class="error-tooltip">
          <slot></slot>
        </base-tooltip>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'FormItemError',
  inheritAttrs: false,
  props: {
    help: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    showTooltip: Boolean,
  },
}
</script>
<style lang="scss">
.el-tooltip__popper.is-dark.error-tooltip {
  @apply bg-red-600;
}

.el-tooltip__popper[x-placement^=top].error-tooltip .popper__arrow {
  border-top-color: #e02424;

  &:after {
    border-top-color: #e02424;
  }
}

.el-tooltip__popper[x-placement^=bottom].error-tooltip .popper__arrow {
  border-bottom-color: #e02424;

  &:after {
    border-bottom-color: #e02424;
  }
}

// .min-h-error {
//   min-height: 12px;
// }
</style>
