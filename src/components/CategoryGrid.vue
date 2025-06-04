<template>
  <div class="categories-list">
    <q-card
      v-for="category in categories"
      :key="category.id"
      clickable
      @click="$emit('go-to-category', category.id)"
      class="category-card"
    >
      <q-img :src="category.image" style="height: 140px" />
      <div class="category-name">{{ category.name }}</div>
    </q-card>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  }
})

defineEmits(['go-to-category'])
</script>

<style scoped>
.categories-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.category-card {
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  overflow: hidden;
}

.category-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.category-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.3);
  color: #222;
  padding: 8px 12px;
  font-weight: 600;
  font-size: 1.1rem;
  backdrop-filter: blur(8px);
  user-select: none;
}
</style>
