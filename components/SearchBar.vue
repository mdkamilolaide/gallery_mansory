<template>
  <div class="bg-custom-gray p-4 w-full h-[280px] flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-md max-w-7xl w-full">
      <div class="flex items-center p-3">
        <!-- Font Awesome Search Icon -->
        <font-awesome-icon :icon="['fas', 'search']" class="text-gray-400 mr-3 w-4 h-4" />

        <!-- Input Field -->
        <input
          type="text"
          :placeholder="placeholder"
          class="w-full border-0 focus:ring-0 focus:outline-none"
          :value="modelValue"
          @input="debouncedHandleInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { debounce } from "lodash";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Search for photos",
  },
});

const emit = defineEmits(["update:modelValue"]);

const debouncedHandleInput = debounce((event) => {
  emit("update:modelValue", event.target.value);
}, 300); // Debouncing for 300ms
</script>
