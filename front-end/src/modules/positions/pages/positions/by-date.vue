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
  />
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

export default {
  components: {
    DatesForm,
    GoogleMap
  },
  data() {
    return {
      center: { lat: 51.093048, lng: 40.84212 },
      markers: [],
      loading: false,
    };
  },
  computed: {
    getMarkers() {
      return this.markers;
    }
  },
  methods: {
    async getPositions(dates, resetDates) {
      console.log(dates);
      this.loading = true;
      let positions = await positionApi.getPositions(dates);
      this.markers = await positions.map(position => ({
        'position': {
          lat: position.latitude,
          lng: position.longitude
        }
      }))
      if(resetDates) {
        this.$refs.datesForm.dates = {
          from: null,
          to: null
        };
      }
      console.log(this.markers);
      this.loading = false;
    }
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
