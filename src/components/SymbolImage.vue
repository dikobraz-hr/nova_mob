<template>
  <div class="symbol-image" :style="{ backgroundColor }" @click="playSound">
    <q-img
      :src="`/symbols/${image}`"
      class="symbol-img"
      :alt="alt"
      :ratio="1/1"
    />
  </div>
</template>

<script setup>
const { image, alt, sound, backgroundColor } = defineProps({
  image: String,
  alt: String,
  sound: String,
  backgroundColor: {
    type: String,
    default: '#ffffff'
  }
})

function playSound() {
  if (sound) {
    new Audio(`/sounds/hr/${sound}`).play()
  }
}
</script>

<style scoped>
.symbol-image {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.symbol-img {
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
}
</style>
