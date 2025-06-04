<template>
  <q-page class="q-pa-md bg-grey-2">


    <!-- Gornji header s hamburger ikonom -->
    <TopHeader @toggle-drawer="toggleDrawer" />

    <!-- Top bar s hamburgerom i searchom, ako je potreban hamburger kao u demu -->
    <div class="top-bar row items-center justify-between q-mx-auto">

      <div class="search-center row items-center">
        <q-icon name="search" size="20px" class="q-mr-sm" />
        <span class="search-text">Pretraži</span>
      </div>

      <div style="width: 40px;"></div>
    </div>


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

</script>

<style scoped lang="scss" src="../css/categoryAll.scss"></style>
