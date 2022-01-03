<template>
  <FormItem v-bind="allAttributes">
    <!--Pass through all slots to FormItem-->
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"/>
    </template>

    <template
      #default="{
        handleBlur, 
        inputValue,
        errorMessage,
        handleChange,
        hasSuffix, 
      }"
    >
      <slot>
        <input
          v-bind="$attrs"
          :value="inputValue"
          :type="type"
          :key="key"
          :name="name || label"
          :class="{
            'form-input-error': errorMessage,
            'pl-8': $slots.prefix,
            'pr-8': hasSuffix,
            'pr-12': hasSuffix && type === 'number',
            'bg-gray-100 dark:bg-gray-700 cursor-not-allowed': $attrs.disabled,
            'dark:bg-gray-800': !$attrs.disabled && $attrs.readonly === undefined,
            'cursor-not-allowed bg-gray-100 dark:bg-gray-700 focus:shadow-none focus:border-transparent': $attrs.readonly !== undefined,
            'flex-1': layout === 'horizontal',
            'rounded-r-none': $slots['after-input'],
          }"
          ref="input"
          class="form-input"
          @focus="onFocus"
          @blur="onBlur(handleBlur)"
          @input="onInput($event, handleChange)"
        />
      </slot>
    </template>
  </FormItem>
</template>
<script>
import { XCircleIcon } from "@zhuowenli/vue-feather-icons";
import FormItem from "@/components/form/FormItem.vue";

export default {
  inheritAttrs: false,
  components: {
    FormItem,
    XCircleIcon,
  },
  props: {
    key: {
      type: String,
      default: '0'
    },
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: [String, Number],
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    layout: {
      type: String,
      default: 'vertical'
    },
  },
  emits: ['update:modelValue'],
  computed: {
    allAttributes() {
      return {
        ...this.$attrs,
        ...this.$props,
      }
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    onFocus() {
      if (this.type !== 'number') return
      if (parseFloat(this.modelValue) === 0) {
        this.$emit('update:modelValue', '')
      }
    },
    onBlur(handleBlur) {
      handleBlur && handleBlur()
      if (this.type !== 'number') {
        return
      }
      if (this.modelValue === '') {
        this.$emit('update:modelValue', 0)
      }
    },
    onInput(evt, handleChange) {
      this.$emit('update:modelValue', evt.target.value || null)
      handleChange && handleChange(evt)
    },
    clearInput() {
      this.$emit('update:modelValue', '')
    },
  },
}
</script>