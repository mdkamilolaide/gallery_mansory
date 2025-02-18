<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center" v-cloak>
    <!-- Search Bar -->
    <SearchBar v-model="searchQuery" @update:modelValue="setSearchQuery" />

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
import { useUnsplashStore } from "~/stores/useUnplashStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import SearchBar from "~/components/SearchBar.vue";
import GalleryGrid from "~/components/GalleryGrid.vue";
import ImageModal from "~/components/ImageModal.vue";

const unsplashStore = useUnsplashStore();
const { photos, loading, selectedImage, searchQuery } = storeToRefs(unsplashStore);
const { fetchPhotos, setSearchQuery } = unsplashStore;

// Fetch photos on mount
onMounted(fetchPhotos);

// Open modal and preload full-size image
const openModal = (photo) => {
  selectedImage.value = photo;

  // Preload full-size image asynchronously
  new Image().src = photo.urls.full;
};

// Close modal
const closeModal = () => (selectedImage.value = null);
</script>

<style scoped>
[v-cloak] {
  display: none !important;
}
</style>
