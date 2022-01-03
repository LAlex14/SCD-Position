<template>
  <!-- Here Sidebar + Headerbar -->
  <div class="bg-gray-200 min-h-screen min-w-screen">
    <Navbar />
    <main
        class="p-10 flex flex-wrap justify-center items-center main-class"
        :class="$route.name"
    >
      <router-view />
    </main>
  </div>
  
</template>
<script>
import Navbar from "@/modules/dashboard/components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  async created() {
    // Here load global data if needed
  }
}
</script>
