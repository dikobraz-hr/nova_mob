<template>
  <q-page class="q-pa-md">
    <q-btn flat icon="arrow_back" class="q-mb-md q-ml-xl q-pt-none" @click="goBack" />
<div v-if="symbol">
    <SymbolImage
      :image="symbol?.image"
      :alt="translatedTitle"
      :sound="translatedSound"
      :background-color="categoryColor"
    />

    <SymbolInfo
    :symbol="symbol"
      :title="translatedTitle || 'Bez naziva'"
      :isFavorite="isFavorite"
      :onPlaySound="playSound"
      :onPlayMainSound="playMainSound"
      :onToggleFavorite="toggleFavorite"
    />
  </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import symbolsData from 'src/assets/symbols_data.json'

import SymbolImage from 'components/SymbolImage.vue'
import SymbolInfo from 'components/SymbolInfo.vue'
import { computed } from 'vue'

const translatedTitle = computed(() => symbol.value?.translations?.[locale.value]?.title)
const translatedSound = computed(() => symbol.value?.translations?.[locale.value]?.sound)

const route = useRoute()
const router = useRouter()

const { locale } = useI18n()


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
  const sound = symbol.value?.translations?.[locale.value]?.sound
  if (sound) {
    new Audio(`/sounds/${locale.value}/${sound}`).play()
  }
}
function playMainSound() {
  const sound = symbol.value?.sound
  if (sound) {
    new Audio(`/sounds/descriptive/${sound}`).play()
  }
}
function toggleFavorite() {
  isFavorite.value = !isFavorite.value
}

function goBack() {
  router.push(`/category/${categoryId}`)
}
</script>
