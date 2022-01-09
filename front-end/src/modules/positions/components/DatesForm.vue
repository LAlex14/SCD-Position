<template>
  <BaseForm
    @submit="$emit('get-positions', dates)"
  >
    <div class="flex flex-wrap items-center justify-center"
    >
      <BaseInput
        label="From date:"
        class="mr-8"
        type="date"
        v-model="dates.from"
      />
      <BaseInput
        label="To date:"
        class="mr-8"
        type="date"
        v-model="dates.to"
      />
      <BaseButton
        type="submit"
        label="Submit"
        class="h-10"
        :disabled="!dates.from && !dates.to"
      />
    </div>
  </BaseForm>
</template>

<script>

export default {
  name: "DatesForm",
  data() {
    return {
      dates: {
        from: null,
        to: null
      },
    }
  }
}

</script>

