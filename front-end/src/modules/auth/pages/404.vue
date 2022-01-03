<template>
  <div class="flex flex-col items-center justify-center min-h-full content-wrapper">
    <div class="mx-auto max-w-screen-xl px-4">
      <div class="text-center">
        <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
          Houston,
          <br class="xl:hidden"/>
          <span class="text-primary-600">we have a problem</span>
        </h2>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {{ $t(`We couldn't find the page you are looking for`) }}
        </p>
        <div class="mt-5 max-w-md mx-auto sm:space-x-4 flex flex-col sm:flex-row justify-center md:mt-8">
          <base-button variant="white"
                       size="xl"
                       block
                       class="mb-4 sm:mb-0"
                       @click="$router.go(-1)">
            {{ $t('Go back') }}
          </base-button>
          <base-button variant="primary"
                       size="xl"
                       block
                       @click="$router.push('/')">
            {{ $t('Take me Home') }}
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.content-wrapper {
  min-height: calc(100vh - 150px);
}
</style>
