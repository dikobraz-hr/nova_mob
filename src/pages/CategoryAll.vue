<template>
  <q-page class="q-pa-md bg-grey-2">
    <TopHeader @toggle-drawer="toggleDrawer" />

    <CategorySearch v-model="search" />

   
    <div class="categories-list q-mt-lg">
      <q-card
        v-for="category in filteredCategories"
        :key="category.id"
        clickable
        @click="goToCategory(category.id)"
        class="category-card"
        :style="{ backgroundColor: category.color || '#fff' }"
      >
        <q-img :src="`/src/assets/${category.image}`" style="height: 140px" />
        <div class="category-name">
          {{ category.translations.hr || category.category }}
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TopHeader from 'components/TopHeader.vue'
import CategorySearch from 'components/CategorySearch.vue'
import categoryData from 'src/assets/categories_data.json'

const router = useRouter()

const categories = ref([])
const search = ref('')

const filteredCategories = computed(() =>
  categories.value.filter(category =>
    (category.translations?.hr || category.category)
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
)

onMounted(() => {
  categories.value = categoryData
})

function goToCategory(id) {
  router.push(`/category/${id}`)
}

function toggleDrawer() {
  console.log('Drawer toggled')
}
</script>

<style scoped lang="scss" src="../css/categoryAll.scss"></style>