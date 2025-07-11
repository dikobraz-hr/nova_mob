<template>
  <q-page class="q-pa-md " style="min-height:calc(100vh - 90px - 90px)">
    <!-- <BannerAd @toggle-drawer="toggleDrawer" /> -->
    <RandomButton @random-click="goToRandom" />
    <CategoryButtonSlider :categories="categories" @go-to-category="goToCategory" class="q-mb-sm q-mt-md" />
    <FavoritesHeader @view-all="goToCategories" />
    <CategorySlider :categories="categories" @go-to-category="goToCategory" class="q-mt-lg" />
     <div class="text-center q-mt-xl q-pt-lg">
                <h6 class="q-my-sm">{{ $t('to_remove_ads') }}</h6>
                <!-- <q-btn icon="add_shopping_cart" class="random-btn q-mb-lg" rounded unelevated color="primary" size="lg"
                    text-color="dark">{{ $t('buy') }}</q-btn> -->
            </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// import BannerAd from '../components/BannerAd.vue'
import RandomButton from '../components/RandomButton.vue'
import FavoritesHeader from '../components/FavoritesHeader.vue'
import CategorySlider from '../components/CategorySlider.vue'
import CategoryButtonSlider from '../components/CategoryButtonSlider.vue'

import categoryData from 'src/assets/categories_data.json'
const router = useRouter()
const { locale } = useI18n()
const categoriesRaw = ref([])  // store full data


onMounted(() => {
  categoriesRaw.value = categoryData.map(cat => ({
    id: cat.id,
    name: cat.translations?.[locale.value].title || cat.category,
    translations: cat.translations,
    image: cat.image,  //slike
    color: cat.color
  }))
})
// Compute categories with reactive names depending on locale
const categories = computed(() =>
  categoriesRaw.value.map(cat => ({
    id: cat.id,
    name: cat.translations?.[locale.value].title || cat.category,
    image: cat.image,
    color: cat.color
  }))
)
function goToRandom() {
  router.push('/game')
}

function goToCategories() {
  router.push('/category-all')
}

function goToCategory(id) {
  console.log('Going to category with ID:', id)
  router.push(`/category/${id}`)
}

// function toggleDrawer() {
//   console.log('Toggle drawer clicked')
// }
</script>


<style scoped lang="scss" src="../css/index.scss"></style>
