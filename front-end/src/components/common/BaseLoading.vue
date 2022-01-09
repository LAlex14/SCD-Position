<template>
  <div
    :class="[
      bgColor,
      bgOpacity,
      $attrs.class,
      { 'w-full h-full min-h-full absolute z-40 inset-0 m-auto' : fullBox }
      ]"
  >
    <img
      src="@/assets/gifs/Loader.gif"
      class="m-auto opacity-80"
      :class="{
        [iconWidth] : true,
         'absolute inset-0' : fullBox 
        }"
    />
  </div>
</template>

<script>

export default {
  name: "BaseLoading",
  props: {
    bgColor: {
      type: String,
      default: 'bg-transparent'
    },
    bgOpacity: {
      type: String,
      default: 'bg-opacity-90'
    },
    iconWidth: {
      type: String,
      default: 'w-10'
    },
    fullBox: {
      type: Boolean,
      default: false
    },
    hScreen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$el.parentElement.classList.add("relative", "overflow-y-hidden");
    if(this.hScreen) {
      this.$el.parentElement.classList.add("h-screen");
    }
  },
  beforeUnmount() {
    this.$el.parentElement.classList.remove("relative", "overflow-y-hidden");
    if(this.hScreen) {
      this.$el.parentElement.classList.remove("h-screen");
    }
  }
}
</script>
