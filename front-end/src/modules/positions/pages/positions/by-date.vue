<template>
  <BaseLoading
    v-if="loading"
    bg-color="bg-white"
    icon-width="w-14"
    full-box
  />
  <DatesForm @get-positions="getPositions"/>
  <GoogleMap
    v-if="!loading"
    :center="center"
    :markers="markers"
  />
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
      markers: null,
      loading: false,
    };
  },
  computed: {
    getMarkers() {
      return this.markers;
    }
  },
  methods: {
    async getPositions(dates) {
      console.log(dates);
      this.loading = true;
      let positions = await positionApi.getPositions(dates);
      this.markers = await positions.map(position => ({
        'position': {
          lat: position.latitude,
          lng: position.longitude
        }
      }))
      console.log(this.markers);
      this.loading = false;
    }
  },
  created() {
    this.getPositions();
  },
};
</script>
