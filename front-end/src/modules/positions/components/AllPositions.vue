<template>
  <BaseLoading
    v-if="loading"
    bg-color="bg-white"
    icon-width="w-14"
    full-box
  />
  <div class="gap-10 flex flex-wrap justify-center items-center">
    <Position
      v-for="position in positions"
      :position="position"
      itemClass="flex justify-between"
      @delete-pos="deletePosition"
      hover
    />
  </div>
  <div v-if="!positions.length">
    There are no added positions
  </div>
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
      this.$success('Positions were successfully deleted');
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
