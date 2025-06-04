<template>
  <q-page class="q-pa-md bg-grey-2">

    <!-- Top bar s hamburgerom i searchom, ako je potreban hamburger kao u demu -->
    <div class="top-bar row items-center justify-between q-mx-auto">
      <q-btn
        dense
        flat
        round
        icon="menu"
        aria-label="Meni"
        @click="$emit('toggle-drawer')"
      />
      <div class="search-center row items-center">
        <q-icon name="search" size="20px" class="q-mr-sm" />
        <span class="search-text">Pretraži</span>
      </div>
    
      <div style="width: 40px;"></div>
    </div>

    <!-- Kategorije, još ih treba dodati ja sam provizorno -->
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

const router = useRouter()

const categories = ref([
  { id: 1, name: 'Životinje' },
  { id: 2, name: 'Vozila' },
  { id: 3, name: 'Hrana' },
])

function goToCategory(id) {
  router.push(`/category/${id}`)
}
</script>

<style scoped>
.top-bar {
  max-width: 900px;
  margin: 0 auto;
  height: 56px;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}

.search-center {
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  display: flex;
  align-items: center;
}

.search-text {
  text-transform: capitalize;
}

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
