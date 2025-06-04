<template>
  <q-page class="q-pa-md bg-grey-2">
    <TopHeader @toggle-drawer="toggleDrawer" />
    <RandomButton @random-click="goToRandom" />
    <CategoryButtonSlider @go-to-category="goToCategory" class="q-mb-lg q-mt-md" />
    <FavoritesHeader @view-all="goToCategories" />
    <CategorySlider :categories="categories" @go-to-category="goToCategory" class="q-mt-xl" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import TopHeader from '../components/TopHeader.vue'
import RandomButton from '../components/RandomButton.vue'
import FavoritesHeader from '../components/FavoritesHeader.vue'
import CategorySlider from '../components/CategorySlider.vue'
import CategoryButtonSlider from '../components/CategoryButtonSlider.vue'

const router = useRouter()

const categories = ref([
  { id: 1, name: 'Obitelj', image:'/symbols/baby.svg'},
  { id: 2, name: 'Životinje',  image:'/symbols/girl.svg' },
  { id: 3, name: 'Vozila', image:'/symbols/mom.svg'},
  { id: 4, name: 'Hrana', image:'/symbols/dad.svg' },
  { id: 5, name: 'Dijelovi tijela', image:'/symbols/friend.svg' }
])

function goToRandom() {
  router.push('/random-game')
}

function goToCategories() {
  router.push('/category-all')
}

function goToCategory(id) {
  router.push(`/category-all/${id}`)
}

function toggleDrawer() {
  console.log('Toggle drawer clicked')
}
</script>

<style scoped>
.q-page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
