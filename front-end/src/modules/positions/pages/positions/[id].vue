<template>
  <Suspense>
    <template #default>
      <ViewPosition :key="id" :id="id" />
    </template>
    <template #fallback>
      Position is loading...
    </template>
  </Suspense>
</template>

<script>
import ViewPosition from "@/modules/positions/components/ViewPosition.vue";

export default {
  components: {
    ViewPosition
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
}
</script>
