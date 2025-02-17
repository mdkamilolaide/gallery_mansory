import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { debounce } from "lodash";

export const useUnsplashStore = defineStore("unsplash", () => {
  const photos = ref([]);
  const loading = ref(false);
  const selectedImage = ref(null);
  const searchQuery = ref("African"); // Default to "African"
  const perPage = ref(8);
  const orderBy = ref("latest");

  const config = useRuntimeConfig();
  const ACCESS_KEY = config.public.unsplashAccessKey;

  // Fetch photos from Unsplash
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
        params.query = "African"; // Reset to default category when empty
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
