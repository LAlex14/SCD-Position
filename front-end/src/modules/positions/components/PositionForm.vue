<template>
  <BaseForm
      v-slot="{ meta }"
      @submit="onSubmit"
  >
    <BaseLoading
      v-if="loading"
      bg-color="bg-white"
      icon-width="w-14"
      full-box
    />
    <div class="flex md:space-x-10 flex-col md:flex-row justify-center items-center flex-wrap">
      <BaseInput
          label="Latitude"
          rules="required|decimal|min_value:-180|max_value:180"
          v-model="position.latitude"
      />
      <BaseInput
          label="Longitude"
          rules="required|decimal|min_value:-180|max_value:180"
          v-model="position.longitude"
      />
      <BaseInput
          label="Date"
          type="date"
          v-model="position.date"
      />
      <BaseButton
        label="Get Current Position"
        custom-class="mb-6 md:mb-0"
        class="h-10"
        variant="secondary"
        @click="getCurrentPosition"
      />
      <BaseButton
        type="submit"
        label="Submit"
        class="h-10"
        :disabled="!meta.valid"
      />
    </div>
  </BaseForm>
</template>

<script>
import positionApi from "@/modules/positions/positionService";

export default {
  props: {
    createMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      position: {
        latitude: '',
        longitude: '',
        date: '',
        created_at: '',
      },
      id: '',
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.$parent.onSubmit(this.position, this.id);
    },
    zeroIfNeed(nr) {
      return nr < 10 ? `0${nr}` : nr;
    },
    async getPosition(id) {
      this.loading = true;
      this.position = await positionApi.getPositionById(id);
      const posDate = new Date(this.position.date);
      this.position.date = `${posDate.getUTCFullYear()}-${this.zeroIfNeed(posDate.getUTCMonth() + 1)}-${this.zeroIfNeed(posDate.getUTCDate())}`;
      this.loading = false;
    },
    async getCurrentPosition() {
      this.loading = true;
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      const success = (pos) => {
        let crd = pos.coords;
        this.position.latitude = crd.latitude;
        this.position.longitude = crd.longitude;
        this.$success('The position was successfully updated');
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        this.loading = false
      }

      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        this.$error(err.message);
        this.loading = false
      }

      await navigator.geolocation.getCurrentPosition(success, error, options);
    }
  },
  async created() {
    if (this.$route.name === 'positions-id') {
      this.id = this.$route.params.id;
      await this.getPosition(this.id);
    }
  }
}

</script>

