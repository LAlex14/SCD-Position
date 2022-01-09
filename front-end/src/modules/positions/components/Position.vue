<template>
  <div
    class="mx-5 mb-10 border-2 border-gray-400"
    :key="position.id"
  >
    <div 
      class="py-2 px-4 border-b border-gray-400"
      :class="itemClass"
    >
      <span class="font-bold text-lg">Latitude: </span>
      {{ position.latitude }}
    </div>
    <div 
      class="py-2 px-4 border-b border-gray-400"
      :class="itemClass"
    >
      <span class="font-bold text-lg">Longitude: </span>
      {{ position.longitude }}
    </div>
    <div 
      class="py-2 px-4 border-b border-gray-400"
      :class="itemClass"
    >
      <span class="font-bold text-lg">Date: </span>
      {{ dateToStirng(position.date) }}
    </div>
    <div 
      class="py-2 px-4 items-center space-x-4"
      :class="itemClass"
    >
      <div class="font-bold text-lg mb-1">Actions:</div>
      <div class="space-x-4">
        <BaseButton
          v-if="$route.name === 'positions'"
          @click="$router.push(`/positions/${position.id}`)"
          variant="secondary"
          label="View"
        />
        <BaseButton
          v-if="$route.name === 'positions-id'"
          @click="$emit('edit-pos', position.id)"
          variant="white"
          label="Edit"
        />
        <BaseButton
          variant="danger"
          label="Delete"
          @click="$emit('delete-pos', position.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import positionApi from "@/modules/positions/positionService";

export default {
  name: "Position",
  props: {
    position: {
      type: Object,
      default: () => ({})
    },
    itemClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    }
  },
  methods: {
    dateToStirng(date) {
      return new Date(date).toLocaleDateString('ro-Ro', this.options)
    },
  },
}
</script>
