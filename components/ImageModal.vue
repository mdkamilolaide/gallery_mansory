<template>
  <div
    v-if="selectedImage"
    class="fixed inset-0 bg-black/70 grid place-items-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full grid">
      <!-- Image -->
      <div class="relative">
        <!-- Placeholder Image -->
        <NuxtImg
          v-if="!isFullImageLoaded"
          :src="selectedImage.urls.small"
          :alt="selectedImage.description"
          format="webp"
          class="rounded-t-lg w-full object-cover max-h-[80vh]"
        />

        <!-- Full-Size Image -->
        <NuxtImg
          v-show="isFullImageLoaded"
          :src="selectedImage.urls.full"
          :alt="selectedImage.description"
          format="webp"
          class="rounded-t-lg w-full object-cover max-h-[80vh]"
          @load="isFullImageLoaded = true"
        />

        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-[-30px] right-[-50px] text-white rounded-full p-3 transition"
        >
          ✕
        </button>
      </div>

      <!-- Details -->
      <div class="grid text-left py-4 px-6">
        <h4 class="text-lg font-semibold">{{ selectedImage.user.name }}</h4>
        <p class="text-sm text-gray-600">
          {{ selectedImage.user.location }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedImage: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["closeModal"]);

const isFullImageLoaded = ref(false);

const closeModal = () => {
  emit("closeModal");
};

// Reset the full image loaded state when the modal closes
watch(
  () => props.selectedImage,
  () => {
    isFullImageLoaded.value = false;
  }
);
</script>
