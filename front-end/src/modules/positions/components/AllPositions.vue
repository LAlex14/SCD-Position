<template>
  <BaseLoading
    v-if="loading"
    bg-color="bg-white"
    icon-width="w-14"
    full-box
    h-screen
  />
  <Position
    v-for="position in positions"
    :position="position"
    itemClass="flex justify-between"
    @delete-pos="deletePosition"
  />
</template>

<script>
import positionApi from "@/modules/positions/positionService";
import Position from "@/modules/positions/components/Position.vue"

export default {
  name: "AllPositions",
  components: {
    Position
  },
  data() {
    return {
      positions: [],
      loading: false
    }
  },
  methods: {
    async getPositions() {
      this.loading = true;
      this.positions = await positionApi.getPositions();
      this.loading = false;
    },
    async deletePosition(id) {
      this.loading = true;
      await positionApi.deletePosition(id);
      await this.getPositions();
      this.loading = false;
    },
  },
  created() {
    this.getPositions();
  },
}
</script>

<style>
.main-class.positions {
  @apply flex flex-wrap justify-center items-center;
}
</style>
