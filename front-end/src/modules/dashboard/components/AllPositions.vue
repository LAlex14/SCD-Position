<template>
  <div
      class="flex mx-5 mb-10 border-2 border-gray-400"
      v-for="position in positions"
      :key="position.id"
  >
    <div
        class=""
    >
      <div class="py-2 px-4 border-b border-gray-400">
        <span class="font-bold text-lg">Latitude: </span>
        {{ position.latitude }}
      </div>
      <div class="py-2 px-4 border-b border-gray-400">
        <span class="font-bold text-lg">Longitude: </span>
        {{ position.longitude }}
      </div>
      <div class="py-2 px-4 border-b border-gray-400">
        <span class="font-bold text-lg">Date: </span>
        {{ dateToStirng(position.date) }}
      </div>
      <div class="py-2 px-4 border-b border-gray-400">
        <div class="font-bold text-lg">Actions</div>
        <BaseButton
            @click="$router.push(`/positions/${position.id}`)"
            variant="secondary"
            label="View"
        />
        <BaseButton
            @click="$router.push(`/edit-position/${position.id}`)"
            variant="white"
            label="Edit"
            class="mx-4"
        />
        <BaseButton
            variant="danger"
            label="Delete"
            @click="$parent.deletePosition(position.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import positionApi from "@/modules/dashboard/positionService";

export default {
  name: "AllPositions",
  data() {
    return {
      positions: [],
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  methods: {
    async getPositions() {
      let result = await positionApi.getPositions();
      this.positions = result.reverse();
    },
    async deletePosition(id) {
      await positionApi.deletePosition(id);
      this.getPositions();
    },
    dateToStirng(date) {
      return new Date(date).toLocaleDateString('ro-Ro', this.options)
    }
  },
  created() {
    this.getPositions();
  },
}
</script>
