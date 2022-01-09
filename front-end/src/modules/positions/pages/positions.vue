<template>
  <!-- Here Sidebar + Headerbar -->
  <div class="bg-gray-200 min-h-screen min-w-screen">
    <Navbar />
    <main class="main overflow-auto">
      <div 
        class="main-class px-8 py-10 bg-white shadow rounded-lg w-full"
        :class="$route.name"
      >
        <router-view />
      </div>
    </main>
  </div>

</template>
<script>
import Navbar from "@/modules/positions/components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  async created() {
    // Here load global data if needed
    console.log(this.$router.options.routes)
    console.log('route', this.$route);
  }
}
</script>
