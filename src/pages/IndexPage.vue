<template>
  <q-page class="q-pa-md bg-grey-2">
    <TopHeader @toggle-drawer="toggleDrawer" />
    <RandomButton @random-click="goToRandom" />
    <CategoryButtonSlider
      :categories="categories"
      @go-to-category="goToCategory"
      class="q-mb-lg q-mt-md"
    />
    <FavoritesHeader @view-all="goToCategories" />
    <CategorySlider
      :categories="categories"
      @go-to-category="goToCategory"
      class="q-mt-xl"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import TopHeader from '../components/TopHeader.vue'
import RandomButton from '../components/RandomButton.vue'
import FavoritesHeader from '../components/FavoritesHeader.vue'
import CategorySlider from '../components/CategorySlider.vue'
import CategoryButtonSlider from '../components/CategoryButtonSlider.vue'

import categoryData from 'src/assets/categories_data.json' 
const router = useRouter()
const categories = ref([])

onMounted(() => {
  categories.value = categoryData.map(cat => ({
    id: cat.id,
    name: cat.translations.hr || cat.category,
    image: `/src/assets/${cat.image}`,  //slike
  }))
})

function goToRandom() {
  router.push('/random-game')
}

function goToCategories() {
  router.push('/category-all')
}

function goToCategory(id) {
  console.log('Going to category with ID:', id)
  router.push(`/category-all/${id}`)
}

function toggleDrawer() { 
  console.log('Toggle drawer clicked')
}
</script>


<style scoped lang="scss" src="../css/index.scss"></style>
