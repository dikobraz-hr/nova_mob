<template>
  <q-page class="q-pa-md">
    <q-btn flat icon="arrow_back" class="q-mb-md q-pa-md" @click="goBack" :label="categoryName"/>
<div v-if="symbol">
  <div class="fit row no-wrap justify-between items-start content-start">
        <q-btn round icon="arrow_back" class="q-mb-md "  color="secondary" text-color="dark" @click="goPrev" size="lg"/>
         <q-btn round icon="shuffle" class="q-mb-md "  color="accent" text-color="dark" @click="goRandom" size="lg"/>
<q-btn round icon="arrow_forward" class="q-mb-md" color="primary" text-color="dark" @click="goNext" size="lg"/>

  </div>
    <SymbolImage
      :image="symbol?.image"
      :alt="translatedTitle"
      :sound="translatedSound"
        :onPlaySound="playSound"
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
import { ref, onMounted,watch  } from 'vue'
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
const symbolId = computed(() => Number(route.params.symbolId))

const symbol = ref(null)
const categoryName = ref(null)
const categoryColor = ref('#ffffff')
const isFavorite = ref(false)

onMounted(() => {
  loadSymbol()
})

watch(() => route.params.symbolId, () => {
  loadSymbol()
})

function loadSymbol() {
  const id = Number(route.params.symbolId)
  const found = symbolsData.find(
    (item) => item.id === id && item.category?.id === categoryId
  )
  if (found) {
    symbol.value = found
    categoryColor.value = found.category?.color ? found.category.color + '80' : '#ffffff80'
    categoryName.value=found.category.translations[locale.value].title;

  } else {
    router.replace(`/category/${categoryId}`)
  }
}
// Global audio instance
let currentAudio = null;

function playSound() {
  const sound = symbol.value?.translations?.[locale.value]?.sound;
  if (sound) {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(`/sounds/${locale.value}/${sound}`);
    currentAudio.play();
  }
}

function playMainSound() {
  const sound = symbol.value?.sound;
  if (sound) {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(`/sounds/descriptive/${sound}`);
    currentAudio.play();
  }
}
function toggleFavorite() {
  isFavorite.value = !isFavorite.value
}

function goBack() {
   if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  router.push(`/category/${categoryId}`)
}
function getSymbolsInCategory() {

  return symbolsData.filter((item) => item.category?.id === categoryId)
}

function goNext() {
   if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  const symbolsInCategory = getSymbolsInCategory()
  const currentIndex = symbolsInCategory.findIndex((item) => item.id === symbolId.value)
  const nextIndex = (currentIndex + 1) % symbolsInCategory.length
  const nextSymbol = symbolsInCategory[nextIndex]
  router.push(`/pojam/${categoryId}/${nextSymbol.id}`)
}
function goRandom() {
   if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  const symbolsInCategory = getSymbolsInCategory()
  const currentId = symbolId.value

  if (symbolsInCategory.length <= 1) {
    // No other symbol to go to
    return
  }

  let randomSymbol
  do {
    const randomIndex = Math.floor(Math.random() * symbolsInCategory.length)
    randomSymbol = symbolsInCategory[randomIndex]
  } while (randomSymbol.id === currentId)

  router.push(`/pojam/${categoryId}/${randomSymbol.id}`)
}
function goPrev() {
   if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  const symbolsInCategory = getSymbolsInCategory()
  const currentIndex = symbolsInCategory.findIndex((item) => item.id === symbolId.value)
  const prevIndex = (currentIndex - 1 + symbolsInCategory.length) % symbolsInCategory.length
  const prevSymbol = symbolsInCategory[prevIndex]
  router.push(`/pojam/${categoryId}/${prevSymbol.id}`)
}

</script>
