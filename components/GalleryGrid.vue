<template>
  <div class="gallery-grid p-4 !-mt-20">
    <!-- Loading Skeletons (During search or when results are empty) -->
    <template v-if="loading || photos.length === 0">
      <h4 class="text-gray-600 text-left w-full px-4 gap-4">
        <div v-if="loading" class="w-full flex items-center space-x-2">
          <span class="custom-blue font-bold text-2xl whitespace-nowrap"
            >Searching for</span
          >
          <span class="custom-blue-light text-2xl whitespace-nowrap"
            >"{{ searchQuery }}"</span
          >
        </div>
        <div v-else class="w-full flex items-center space-x-2">
          <span class="custom-blue font-bold text-2xl whitespace-nowrap"
            >No results found for</span
          >
          <span class="custom-blue-light text-2xl whitespace-nowrap"
            >"{{ searchQuery }}"</span
          >
        </div>
      </h4>
      <div
        v-for="(height, i) in skeletonHeights"
        :key="i"
        class="skeleton-box"
        :style="{ gridRowEnd: `span ${height}` }"
      ></div>
    </template>

    <!-- Gallery Image Grid -->
    <template v-else>
      <GalleryItem
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
        @click="emit('openModal', photo)"
      />
    </template>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import GalleryItem from "./GalleryItem.vue";

defineProps({
  photos: { type: Array, required: true },
  loading: { type: Boolean, required: true },
  searchQuery: { type: String, required: true },
});

const emit = defineEmits(["openModal"]);

const skeletonHeights = ref([]);

// Generate skeleton heights once on client mount
onMounted(() => {
  skeletonHeights.value = Array.from(
    { length: 9 },
    () => Math.floor(Math.random() * 9) + 10
  );
});
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 15px;
  gap: 16px;
  max-width: 1200px;
  width: 100%;
  margin: auto;
}

.skeleton-box {
  background: #e0e0e0;
  border-radius: 8px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
