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
    <BaseButton
        v-if="showDeleteAll"
        label="DeleteAll"
        variant="danger"
        @click="onDeleteAll"
    />
  </div>
</template>

<script>
import positionApi from "@/modules/dashboard/positionService";

export default {
  name: "Navbar",
  computed: {
    showDeleteAll() {
      return this.$route.name === 'ViewPositions' && !this.$route.params.id
    }
  },
  data() {
    return {
      pages: [
        {
          title: 'All Positions',
          routeName: 'ViewPositions'
        },
        {
          title: 'Positions by date',
          routeName: 'ViewPositions'
        },
        {
          title: 'Create Position',
          routeName: 'CreatePosition'
        },
       
      ]
    }
  },
  methods: {
    async onDeleteAll() {
      await positionApi.deletePositions();
      this.$router.go(0);
    },
  },
}
</script>
