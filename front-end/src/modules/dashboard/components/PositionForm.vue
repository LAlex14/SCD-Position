<template>
  <VeeForm
      v-slot="{ meta }"
      @submit="onSubmit"
  >
    <div class="flex sm:space-x-10 flex-col sm:flex-row">
      <BaseInput
          label="Latitude"
          rules="required|decimal"
          v-model="position.latitude"
      />
      <BaseInput
          label="Longitude"
          rules="required|decimal"
          v-model="position.longitude"
      />
      <BaseInput
          label="Date"
          type="date"
          v-model="position.date"
      />
    </div>

    <BaseButton
        type="submit"
        label="Submit"
        class="mt-10"
    />
  </VeeForm>
</template>

<script>
import positionApi from "@/modules/dashboard/positionService";

export default {
  data() {
    return {
      position: {
        latitude: '',
        longitude: '',
        date: '',
        created_at: '',
      },
      id: ''
    }
  },
  methods: {
    onSubmit() {
      this.$parent.onSubmit(this.position, this.id);
    },
    zeroIfNeed(nr) {
      return nr < 10 ? `0${nr}` : nr;
    },
    async getPosition(id) {
      this.position = await positionApi.getPositionById(id);
      const posDate = new Date(this.position.date);
      this.position.date = `${posDate.getUTCFullYear()}-${this.zeroIfNeed(posDate.getUTCMonth() + 1)}-${this.zeroIfNeed(posDate.getUTCDate())}`;
    },
  },
  async created() {
    if (this.$route.name === 'EditPosition') {
      this.id = this.$route.params.id;
      await this.getPosition(this.id);
    }
  }
}

</script>

