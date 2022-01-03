<template>
  <div>
    <div class="content flex flex-col items-start justify-center">
      <div class="p-8 bg-white shadow rounded-lg sm:p-12 lg:px-20 w-full">
        <img
          v-if="position.image"
          class="object-cover mx-auto mb-5 rounded-lg max-h-80"
          :src="`http://127.0.0.1:8000/uploads/${position.image}`"
          :alt="$t('position.image.alt')"
        />
        <div ref="position">
          <div class="flex space-x-4 justify-center">
            <div
              v-for="(tag, index) in position.tags"
              class="font-bold text-gray-600 border-2 border-blue-400 px-3 py-1 rounded-full bg-blue-100"
              :key="index"
            >
              {{ tag }}
            </div>
          </div>
          
          <div class="title text-5xl my-5 text-center w-full">
            {{ position.title }}
          </div>
          <div>
            {{ position.body }}
          </div>
          <div class="flex justify-between mt-10">
            <div>
              Posted at: {{ position.created_at }}
            </div>
            <div>
              Author: Leșan Alexandru
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import positionApi from "@/modules/dashboard/positionService";

export default {
  name: "ViewPosition.vue",
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      position: '',
    }
  },
  methods: {
    async getPosition(id) {
      this.position = await positionApi.getPositionById(id);
    },
    tagsToArray(){
      let tags = this.position.tags.split(',');
      tags.forEach((tag,index) => tags[index] = tag.trim());
      this.position.tags = [...tags];
    }
  },
  async created() {
    await this.getPosition(this.id);
    await this.tagsToArray();
  }
}
</script>
