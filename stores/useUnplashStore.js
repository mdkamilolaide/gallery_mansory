import { defineStore } from "pinia";
import axios from "axios";
import { reactive, computed, toRefs } from "vue";
import { debounce } from "lodash-es";

export const useUnsplashStore = defineStore("unsplash", () => {
  const state = reactive({
    photos: [],
    loading: false,
    selectedImage: null,
    searchQuery: "",
    perPage: 8,
    orderBy: "latest",
  });

  const config = useRuntimeConfig();
  const ACCESS_KEY = computed(() => config.public.unsplashAccessKey);

  // Computed API parameters
  const apiParams = computed(() => ({
    per_page: state.perPage,
    order_by: state.orderBy,
    query: state.searchQuery.trim() || "African",
  }));

  // Fetch photos from Unsplash (debounced in other to avoid too many requests on user input)
  const fetchPhotos = debounce(async () => {
    if (!ACCESS_KEY.value) return;

    state.loading = true;
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: apiParams.value,
          headers: { Authorization: `Client-ID ${ACCESS_KEY.value}` },
        }
      );

      state.photos = response.data.results;
    } catch (error) {
      console.warn("Failed to fetch photos:", error);
    } finally {
      state.loading = false;
    }
  }, 500);

  // Update search query and trigger fetch
  const setSearchQuery = (query) => {
    state.searchQuery = query;
    fetchPhotos();
  };

  return {
    ...toRefs(state),
    fetchPhotos,
    setSearchQuery,
    openModal: (photo) => (state.selectedImage = photo),
    closeModal: () => (state.selectedImage = null),
  };
});
