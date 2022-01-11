<template>
  <BaseLoading
    v-if="loading"
    bg-color="bg-white"
    icon-width="w-14"
    full-box
  />
  <div class="absolute top-4 right-4">
    <BaseButton
      label="View all"
      size="sm"
      variant="secondary"
      @click="getPositions(_, true)"
    />
  </div>
  <DatesForm @get-positions="getPositions" ref="datesForm"/>
  <GoogleMap
    v-if="!loading && markers.length"
    :center="center"
    :markers="markers"
    @select-pos="selectPos"

  />
  <div class="gap-10 flex mt-10 flex-wrap justify-center items-center">
    <Position
      v-for="position in positions"
      class="hover:bg-gray-100 cursor-pointer"
      :class="{
        'bg-gray-100' : selectedPos === position.id
      }"
      :key="position.id"
      :position="position"
      itemClass="flex justify-between"
      @delete-pos="deletePosition"
      @click="selectPos(position, true)"
    />
  </div>
  <div 
    v-if="!markers.length"
    class="w-full text-center"
  >
    There are no positions
  </div>
</template>

<script>
import positionApi from "@/modules/positions/positionService";
import DatesForm from "@/modules/positions/components/DatesForm.vue";
import GoogleMap from "@/modules/positions/components/GoogleMap.vue";
import Position from "@/modules/positions/components/Position.vue"

export default {
  components: {
    DatesForm,
    GoogleMap,
    Position
  },
  data() {
    return {
      positions: [],
      center: { lat: 51.093048, lng: 40.84212 },
      selectedPos: null,
      loading: false,
    };
  },
  computed: {
    markers() {
      return this.positions.map(position => ({
        id: position.id,
        position: {
          lat: position.latitude,
          lng: position.longitude
        }
      }))
    }
  },
  methods: {
    async getPositions(dates, resetDates) {
      console.log(dates);
      this.loading = true;
      this.positions = await positionApi.getPositions(dates);
      if(resetDates) {
        this.$refs.datesForm.dates = {
          from: null,
          to: null
        };
      }
      console.log(this.markers);
      this.$success('The positions were successfully generated');
      this.loading = false;
    },
    selectPos(pos, updateCenter) {
      if(pos.id === this.selectedPos)
        return;
      this.selectedPos = pos.id;
      if(updateCenter) {
        this.center = {
          lat: pos.latitude,
          lng: pos.longitude
        }
      }
      this.$success('The position was selected');
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
};
</script>

<style>
.main-class.positions-by-date {
  @apply relative;
}
</style>
