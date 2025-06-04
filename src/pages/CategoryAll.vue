<template>
  <q-page class="q-pa-md bg-grey-2">

    <!-- Gornji header s hamburger ikonom -->
    <TopHeader @toggle-drawer="toggleDrawer" />

    <!-- Lista kategorija -->
    <div class="categories-list q-mt-lg">
      <q-card
        v-for="category in categories"
        :key="category.id"
        clickable
        @click="goToCategory(category.id)"
        class="category-card"
      >
        <q-img :src="category.image" style="height: 140px" />
        <div class="category-name">{{ category.name }}</div>
      </q-card>
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopHeader from 'components/TopHeader.vue'

const router = useRouter()

// Lokalne kategorije
const categories = ref([
  { id: 1, name: 'Životinje', image: 'https://via.placeholder.com/150/8e44ad/ffffff?text=Životinje' },
  { id: 2, name: 'Vozila', image: 'https://via.placeholder.com/150/2980b9/ffffff?text=Vozila' },
  { id: 3, name: 'Hrana', image: 'https://via.placeholder.com/150/27ae60/ffffff?text=Hrana' },
  { id: 4, name: 'Obitelj', image: '/symbols/baby.svg' }, // lokalna slika iz /public/symbols
])

function goToCategory(id) {
  router.push(`/category/${id}`)
}

function toggleDrawer() {
  console.log('Drawer toggled')
}
</script>

<style scoped>
.categories-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  padding-top: 40px;
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
