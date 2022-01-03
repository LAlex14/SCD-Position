<template>
  <div
    :class="{
      'sm:grid sm:gap-4 sm:items-start': layout === 'horizontal',
      'sm:grid-cols-4': columnCount === 4 && layout === 'horizontal',
      'sm:grid-cols-5': columnCount === 5 && layout === 'horizontal',
      'has-error': errorMessage,
      [$attrs.class]: $attrs.class,
    }"
  >
    <label v-if="label || $slots.label"
           :for="$attrs.id"
           class="text-sm font-medium leading-5 text-gray-700 dark:text-gray-200 flex flex-wrap"
           :class="{
             'sm:mt-px sm:pt-2': layout === 'horizontal',
             'items-center': layout === 'vertical',
           }"
    >
      <slot name="label">
        {{ label }}
        <span v-if="required" class="text-gray-500">
            *
        </span>
        <BaseIconTooltip v-if="infoText.length" :content="infoText"/>
      </slot>
      <span v-if="labelInfo"
            class="min-w-full flex items-center justify-between text-xs text-gray-400  mb-1">
        <span class="flex items-center">
          <info-icon size="1.3x" class="text-black mr-2"></info-icon>
          {{ labelInfo }}
        </span>
        <span v-if="maxLength" class="whitespace-nowrap ml-2"
              :class="{ 'text-red-500' : inputValue?.length >= maxLength }">
          {{ inputValue?.length || 0 }} / {{ maxLength }}
        </span>
      </span>
    </label>

    <div :class="{
              'relative rounded-md': true,
              'mt-1 sm:mt-0': layout === 'horizontal',
              'sm:col-span-3': layout === 'horizontal' && columnCount === 4,
              'sm:col-span-4': layout === 'horizontal' && columnCount === 5,
           }"
    >
        <span v-if="$slots.prefix"
              class="absolute inset-y-0 left-0 pl-3 flex items-center"
              :class="{
                  'mb-2': !inlineErrors && !errorMessage,
                  'mb-5': !inlineErrors && errorMessage,
              }"
        >
            <span class="text-gray-500 sm:text-sm sm:leading-5">
                <slot name="prefix"></slot>
            </span>
        </span>
      <FormItemError :error="errorMessage"
                     :show-tooltip="inlineErrors"
                     :class="{
                          'flex-1 max-w-full': layout === 'horizontal'
                        }"
      >
        <slot
          :handleChange="handleChange"
          :handleBlur="handleBlur"
          :inputValue="inputValue"
          :errorMessage="errorMessage"
        />

      </FormItemError>
      <div v-if="hasSuffix && !errorMessage"
           class="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
           :class="{'mb-5': !inlineErrors}"
      >
          <span class="text-gray-500 sm:text-sm sm:leading-5">
              <slot name="suffix"></slot>
          </span>
        <XCircleIcon v-if="modelValue && clearable"
                     class="w-4 h-4 text-gray-400 cursor-pointer"
                     @click="$emit('clear-click')"
        />
      </div>

      <div v-if="$slots['prefix-icon']"
           class="absolute inset-y-0 left-0 flex items-start">
        <slot name="prefix-icon"/>
      </div>
      <div v-if="$slots['suffix-icon'] || clearable"
           class="absolute inset-y-0 right-0 flex items-start">
        <slot name="suffix-icon"></slot>
      </div>

      <div v-if="errorMessage && showErrorIcon"
           class="absolute inset-y-0 right-0 pb-4 pr-3 flex items-center pointer-events-none z-10">
        <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { provide } from "vue";
import { useField } from "vee-validate";
import { XCircleIcon, InfoIcon } from '@zhuowenli/vue-feather-icons'
import FormItemError from "@/components/form/FormItemError.vue";

export default {
  components: {
    InfoIcon,
    XCircleIcon,
    FormItemError,
  },
  props: {
    maxLength: {
      type: [Number, String],
      default: ''
    },
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelInfo: {
      type: String,
      default: '',
    },
    infoText: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    inlineErrors: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [String, Object, Array],
      default: ''
    },
    layout: {
      type: String,
      default: 'vertical'
    },
    columnCount: {
      type: Number,
      default: 4,
    },
    showErrorIcon: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const name = props.name || props.label
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(name, props.rules, {
      initialValue: props.modelValue,
    });
    
    provide('handleChange', handleChange)
    provide('handleBlur', handleBlur)

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
  computed: {
    hasSuffix() {
      return this.$slots.suffix || (this.clearable && this.modelValue)
    }
  },
  watch: {
    modelValue(val, oldVal) {
      if (val && this.maxLength && val.length > this.maxLength) {
        this.$emit('update:modelValue', oldVal)
        this.inputValue = oldVal
        return
      }

      if (val !== this.inputValue) {
        this.inputValue = val
      }
    }
  }
}
</script>
