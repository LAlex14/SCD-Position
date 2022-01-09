<template>
  <BaseLoading
    v-if="loading"
    bg-color="bg-white"
    icon-width="w-14"
    full-box
  />
  <Position 
    :position="position"
    itemClass="flex justify-between"
    @edit-pos="editMode = !editMode"
  />
  <PositionForm 
    v-if="editMode"
  />
  <GoogleMap
    class="view-pos"
    :zoom="10"
    v-if="!loading && !editMode"
    :center="center"
  />
</template>

<script>
import positionApi from "@/modules/positions/positionService";
import Position from "@/modules/positions/components/Position.vue"
import PositionForm from "@/modules/positions/components/PositionForm.vue";
import GoogleMap from "@/modules/positions/components/GoogleMap.vue";

export default {
  name: "ViewPosition.vue",
  components: {
    Position,
    PositionForm,
    GoogleMap
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    center() {
      return { lat: this.position.latitude, lng: this.position.longitude }
    }
  },
  data() {
    return {
      position: {},
      editMode: false,
      loading: false
    }
  },
  methods: {
    async onSubmit(position, id) {
      this.loading = true;
      await positionApi.updatePosition(position, id);
      await this.getPosition(this.id);
      this.$success('The position was successfully edited')
      this.editMode = false;
      this.loading = false;
    },
    async getPosition(id) {
      this.loading = true;
      this.position = await positionApi.getPositionById(id);
      this.loading = false;
    },
    dateToStirng(date) {
      return new Date(date).toLocaleDateString('ro-Ro', this.options)
    }
  },
  async created() {
    await this.getPosition(this.id);
  }
}
</script>
