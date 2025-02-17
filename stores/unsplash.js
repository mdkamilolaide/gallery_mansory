import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { debounce } from "lodash-es";

export const useUnsplashStore = defineStore("unsplash", () => {
  const photos = ref([]); // Photos array
  const loading = ref(false); // Loading state
  const selectedImage = ref(null); // Selected Image for Modal
  const searchQuery = ref(""); // Search Query
  const perPage = ref(8); // 8 photos per page
  const orderBy = ref("latest"); //Order By Latest

  const config = useRuntimeConfig();
  const ACCESS_KEY = config.public.unsplashAccessKey;

  // Fetch photos from Unsplash Store
  const fetchPhotos = async () => {
    loading.value = true;
    try {
      const params = {
        per_page: perPage.value,
        order_by: orderBy.value,
      };

      if (searchQuery.value.trim()) {
        params.query = searchQuery.value;
      } else {
        // Default to Latest African photos
        params.query = "African";
      }

      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params,
          headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
        }
      );

      photos.value = response.data.results;
    } catch (error) {
      console.warn("Failed to fetch photos:", error);
    } finally {
      loading.value = false;
    }
  };

  // Debounced search query update
  const setSearchQuery = debounce((query) => {
    searchQuery.value = query; // Update regardless of whether it's empty
    fetchPhotos();
  }, 500);

  return {
    photos,
    loading,
    selectedImage,
    searchQuery,
    perPage,
    fetchPhotos,
    setSearchQuery,
    openModal: (photo) => (selectedImage.value = photo),
    closeModal: () => (selectedImage.value = null),
  };
});
