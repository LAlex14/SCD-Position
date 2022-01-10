<template>
  <GMapMap
    :center="centerCopy"
    :zoom="zoom"
    map-type-id="terrain"
  >
    <GMapCluster :zoomOnClick="true">
      <GMapMarker
        v-if="markers.length"
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        @click="onMarkerClick(m)"
      />
      <GMapMarker
        v-else
        :position="centerCopy"
        :clickable="true"
        @click="onMarkerClick(centerCopy)"
      />
    </GMapCluster>
  </GMapMap>
</template>

<script>
export default {
  name: "GoogleMap",
  props: {
    center: {
      type: Object,
      default: {lat: 51.093048, lng: 40.84212}
    },
    markers: {
      type: Array,
      default: () => ([])
    },
    zoom: {
      type: Number,
      default: 2
    }
  },
  watch: {
    center(value) {
      this.centerCopy = {...value}
    }
  },
  data() {
    return {
      centerCopy: {}
    }
  },
  methods: {
    onMarkerClick(marker) {
      this.centerCopy = marker.position;
      this.$success('The position was selected');
      this.$emit('select-pos', marker.id)
    }
  },
  created() {
    this.centerCopy = {...this.center}
  }
}
</script>

<style lang="scss">
.vue-map-container {
  height: 460px;
}

.view-pos.vue-map-container {
  height: 310px;
}
</style>
