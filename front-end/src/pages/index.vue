<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  beforeCreate() {
  this.$router.push("/positions");
  }
})
</script>
