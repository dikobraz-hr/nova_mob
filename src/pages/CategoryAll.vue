<template>
  <q-page class="q-pa-md ">
    <!-- <BannerAd @toggle-drawer="toggleDrawer" /> -->

    <CategorySearch v-model="search" />

    <div class="categories-list q-mt-lg">

      <q-card v-for="category in filteredCategories" :key="category.id" clickable @click="goToCategory(category.id)">
        <q-img class="category-card q-pb-lg" :src="`/category_images/${category.image}`" style="height: 130px"
          fit="contain" :style="{ backgroundColor: category.color ? category.color + '80' : '#fff' }" />
        <div class="category-name ">
          {{ getTranslatedTitle(category).value }}
        </div>
      </q-card>
    </div>
    <div class="text-center q-mt-xl q-pt-lg">
                <h6 class="q-my-sm">{{ $t('to_remove_ads') }}</h6>
                <!-- <q-btn icon="add_shopping_cart" class="random-btn q-mb-lg" rounded unelevated color="primary" size="lg"
                    text-color="dark">{{ $t('buy') }}</q-btn> -->
            </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

// import BannerAd from 'src/components/BannerAd.vue'
import CategorySearch from 'components/CategorySearch.vue'
import categoryData from 'src/assets/categories_data.json'

const router = useRouter()
const translatedTitlesMap = ref(new Map())

const { locale } = useI18n()

const categories = ref([])
const search = ref('')
function setupTranslatedTitles() {
  const map = new Map()
  categories.value.forEach(category => {
    map.set(
      category.id,
      computed(() => category.translations?.[locale.value].title || category.category || 'Bez naziva')
    )
  })
  translatedTitlesMap.value = map
}
onMounted(() => {
  categories.value = categoryData
  setupTranslatedTitles()
})

// Rebuild computed titles when locale changes
watch(locale, () => {
  setupTranslatedTitles()
})

// Filter categories by translated title reactive to locale and search
const filteredCategories = computed(() => {
  const term = (search.value || '').toLowerCase()
  return categories.value.filter(category => {
    const titleRef = translatedTitlesMap.value.get(category.id)
    if (!titleRef) return false
    return titleRef.value.toLowerCase().includes(term)
  })
})

function getTranslatedTitle(category) {
  return translatedTitlesMap.value.get(category.id) || ref(category.category || 'Bez naziva')
}

function goToCategory(id) {
  router.push(`/category/${id}`)
}

// function toggleDrawer() {
//   console.log('Drawer toggled')
// }
</script>

<style scoped lang="scss" src="../css/categoryAll.scss"></style>
