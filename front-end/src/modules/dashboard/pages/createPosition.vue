<template>
  <PositionForm />
</template>

<script>
import positionApi from "@/modules/dashboard/positionService";
import PositionForm from "../components/PositionForm.vue";

export default {
  components: {
    PositionForm
  },
  methods: {
    async onSubmit(position) {
      let result = await positionApi.createPosition(position);
      this.$router.push(`/positions/${result.id}`);
    },
  },
}

</script>

<style>
.main-class.CreatePosition {
  @apply flex-col;
}
</style>
