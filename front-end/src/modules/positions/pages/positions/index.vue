<template>
  <PositionForm class="mb-4 w-full" v-if="isCreateMode" create-mode />
  <AllPositions ref="allpositions" />
</template>

<script>
import AllPositions from "@/modules/positions/components/AllPositions.vue";
import positionApi from "@/modules/positions/positionService";
import PositionForm from "@/modules/positions/components/PositionForm.vue";

export default {
  name: "positions",
  components: {
    AllPositions,
    PositionForm
  },
  computed: {
    isCreateMode() {
      return this.$route.query.create === 'true'
    }
  },
  methods: {
    async onSubmit(position) {
      await positionApi.createPosition(position);
      this.$success('The position was successfully created')
      await this.$refs.allpositions.getPositions();
      await this.$router.replace({ query: {}});
    },
  },
}
</script>
