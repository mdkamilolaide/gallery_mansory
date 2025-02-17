<template>
  <div
    class="gallery-item"
    :style="{ gridRowEnd: `span ${getGridRowSpan(photo)}` }"
    @click="$emit('click', photo)"
  >
    <NuxtImg
      :src="photo.urls.small"
      :alt="photo.description || 'Unsplash Image'"
      format="webp"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      class="w-full h-full object-cover rounded-lg"
      loading="lazy"
      :placeholder="photo.urls.thumb"
    />
    <div class="info-box">
      <h4>{{ photo.user.name }}</h4>
      <p>{{ photo.user.location }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  photo: {
    type: Object,
    required: true,
  },
});

const getGridRowSpan = (photo) => {
  const aspectRatio = photo.height / photo.width;
  return Math.ceil(aspectRatio * 15);
};
</script>

<style scoped>
.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.info-box {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.info-box h4 {
  font-weight: bold;
  margin-bottom: 4px;
}

.info-box p {
  margin: 0;
}
</style>
