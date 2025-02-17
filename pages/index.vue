<template>
  <div class="min-h-screen bg-white-100 flex flex-col items-center" v-cloak>
    <!-- Search Bar -->
    <SearchBar v-model="searchQuery" @update:modelValue="handleSearch" />

    <!-- Gallery Grid -->
    <GalleryGrid
      :photos="photos"
      :loading="loading"
      :searchQuery="searchQuery"
      @openModal="openModal"
    />

    <!-- Modal -->
    <ImageModal :selectedImage="selectedImage" @closeModal="closeModal" />
  </div>
</template>

<script setup>
import { useUnsplashStore } from "~/stores/unsplash";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import SearchBar from "~/components/SearchBar.vue";
import GalleryGrid from "~/components/GalleryGrid.vue";
import ImageModal from "~/components/ImageModal.vue";

const unsplashStore = useUnsplashStore();
const { photos, loading, selectedImage, searchQuery } = storeToRefs(unsplashStore);
const { fetchPhotos, setSearchQuery } = unsplashStore;

// Fetch photos on mount
onMounted(() => {
  fetchPhotos();
});

// Debounced search input handler
const handleSearch = (query) => {
  setSearchQuery(query);
};

// Open modal and preload the full-size image
const openModal = (photo) => {
  selectedImage.value = photo;

  // Preload the full-size image
  const img = new Image();
  img.src = photo.urls.full;
  img.onload = () => {
    // Image is preloaded, no further action needed
  };
};

// Close modal
const closeModal = () => {
  selectedImage.value = null;
};
</script>
<style>
v-cloak {
  display: none !important;
}
</style>
