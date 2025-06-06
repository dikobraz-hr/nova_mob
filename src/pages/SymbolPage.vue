<template>
  <q-page class="q-pa-md">
    <q-btn flat icon="arrow_back" class="q-mb-md" @click="goBack" />

    <SymbolImage
      :image="symbol?.image"
      :alt="symbol?.translations?.hr?.title"
      :sound="symbol?.translations?.hr?.sound"
      :background-color="categoryColor"
    />

    <SymbolInfo
      :title="symbol?.translations?.hr?.title || 'Bez naziva'"
      :isFavorite="isFavorite"
      :onPlaySound="playSound"
      :onToggleFavorite="toggleFavorite"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import symbolsData from 'src/assets/symbols_data.json'

import SymbolImage from 'components/SymbolImage.vue'
import SymbolInfo from 'components/SymbolInfo.vue'

const route = useRoute()
const router = useRouter()

const categoryId = Number(route.params.categoryId)
const symbolId = Number(route.params.symbolId)

const symbol = ref(null)
const categoryColor = ref('#ffffff')
const isFavorite = ref(false)

onMounted(() => {
  const found = symbolsData.find(
    (item) => item.id === symbolId && item.category?.id === categoryId
  )
  if (found) {
    symbol.value = found
    categoryColor.value = found.category?.color || '#ffffff'
  } else {
    router.replace(`/category/${categoryId}`)
  }
})

function playSound() {
  const sound = symbol.value?.translations?.hr?.sound
  if (sound) {
    new Audio(`/sounds/${sound}`).play()
  }
}

function toggleFavorite() {
  isFavorite.value = !isFavorite.value
}

function goBack() {
  router.push(`/category/${categoryId}`)
}
</script>
