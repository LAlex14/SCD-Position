<template>
  <div class="flex fixed top-0 justify-around items-center h-14 bg-gray-400 w-full z-50">
    <div
      v-for="(page,index) in pages"
      :key="index"
      class="text-white font-extrabold text-lg hover:cursor-pointer"
      @click="$router.push({name: page.routeName})"
    >
      {{ page.title }}
    </div>
    <div v-if="showDeleteAll">
      <BaseButton
        :label="isCreateMode ? 'Cancel' : 'Create'"
        class="mr-8"
        :variant="isCreateMode ? 'danger-secondary' : 'primary'"
        @click="swithCreateMode"
      />
      <BaseButton
        label="Delete All"
        variant="danger"
        @click="onDeleteAll"
      />
    </div>
  </div>
</template>

<script>
import positionApi from "@/modules/positions/positionService";

export default {
  name: "Navbar",
  computed: {
    showDeleteAll() {
      return this.$route.name === 'positions'
    },
    isCreateMode() {
      return this.$route.query.create === 'true'
    }
  },
  data() {
    return {
      pages: [
        {
          title: 'All Positions',
          routeName: 'positions'
        },
        {
          title: 'Positions by date',
          routeName: 'positions-by-date'
        },
      ]
    }
  },
  methods: {
    async onDeleteAll() {
      await positionApi.deletePositions();
      await this.$router.push('/');
      this.$success('The positions was successfully deleted')
    },
    swithCreateMode() {
      if (this.isCreateMode)
        this.$router.replace({query: {}})
      else
        this.$router.replace({query: {create: 'true'}})
    }
  },
}
</script>
