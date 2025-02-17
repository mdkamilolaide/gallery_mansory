<template>
  <div class="gallery-grid p-4 !-mt-20">
    <!-- Search Message -->
    <h4
      v-if="loading || photos.length === 0 || searchQuery.length > 0"
      class="search-message xl:-ml-5 md:-ml-5"
    >
      <div class="w-full flex items-center space-x-2">
        <span class="custom-blue font-bold text-2xl">
          {{ searchMessage }}
        </span>
        <span class="custom-blue-light text-2xl">{{
          searchMessage ? `"${searchQuery}"` : ""
        }}</span>
      </div>
    </h4>

    <!-- Skeleton Loading State -->
    <template v-if="loading || photos.length === 0">
      <div
        v-for="(height, i) in skeletonHeights"
        :key="i"
        class="skeleton-box"
        :style="{ gridRowEnd: `span ${height}` }"
      >
        <div class="skeleton-info-box">
          <h4 class="skeleton-name"></h4>
          <p class="skeleton-location"></p>
        </div>
      </div>
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
import { ref, onMounted, computed } from "vue";
import GalleryItem from "./GalleryItem.vue";

const props = defineProps({
  photos: { type: Array, required: true },
  loading: { type: Boolean, required: true },
  searchQuery: { type: String, required: true },
});

const searchMessage = computed(() => {
  if (props.loading && props.searchQuery) {
    return "Searching for";
  } else if (props.searchQuery && props.photos.length === 0) {
    return "No results found for";
  } else if (props.searchQuery && props.photos.length > 0) {
    return "Search Results for";
  } else {
    return "";
  }
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
  grid-auto-rows: 18px;
  gap: 16px;
  max-width: 1200px;
  width: 100%;
  margin: auto;
}

/* Search Message */
.search-message {
  grid-column: 1 / -1;
  width: 100%;
  display: block;
  padding: 0;
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: -40px !important;
}
.search-message .custom-blue {
  color: #23344f;
  font-size: 2rem !important;
}
.search-message .custom-blue-light {
  color: #7c8a9c;
}

/* Skeleton Box */
.skeleton-box {
  position: relative;
  overflow: hidden;
  background: #e0e0e0;
  border-radius: 8px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

/* Shimmer effect */
.skeleton-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%);
  animation: shimmer 2.5s infinite linear;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Skeleton Info Box (Footer) */
.skeleton-info-box {
  margin-top: auto;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skeleton-name,
.skeleton-location {
  height: 12px;
  border-radius: 4px;
  background: #d6d6d6;
}

.skeleton-name {
  width: 60%;
}

.skeleton-location {
  width: 40%;
}
</style>
