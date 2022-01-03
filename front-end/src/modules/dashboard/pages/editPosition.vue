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
    async onSubmit(position, id) {
      let result = await positionApi.updatePosition(position, id);
      this.$router.push(`/positions/${result.id}`);
    },
  }
}

</script>

