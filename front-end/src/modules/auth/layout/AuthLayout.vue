<template>
  <div class="min-h-screen flex flex-col justify-center py-12 px-2 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-lg">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script>

export default {
}
</script>
<style lang="scss">
</style>
