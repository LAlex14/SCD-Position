<template>
  <ViewPosition
    v-if="id"
    :id="id"
  />
  <AllPositions
    v-else
    ref="allpositions"
  />
</template>

<script>
import AllPositions from "@/modules/dashboard/components/AllPositions.vue";
import ViewPosition from "@/modules/dashboard/components/ViewPosition.vue";

export default {
  name: "positions",
  components: {
    AllPositions,
    ViewPosition
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
}
</script>