<template>
  <div>
  <VeeForm
    v-slot="{ meta }"
    @submit="onFormSubmit"
  >
    {{ meta }}
    <div class="text-center">{{ $t('Login') }}</div>
    <BaseInput
      v-model="username"
      :name="$t('Username')"
      :label="$t('Username')"
      layout="vertical"
      rules="required"
      class="w-56 m-auto"
    />
    <BaseInput
      v-model="password"
      :name="$t('Password')"
      :label="$t('Password')"
      layout="vertical"
      rules="required"
      class="w-56 m-auto"
    />
    
    <BaseButton
      class="p-10"
      type="submit"
    >
    {{ $t('Login') }}
    </BaseButton>
    </VeeForm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$error('Not yet implemented...')
    },
    onFormSubmit() {

    }
  }
}
</script>
