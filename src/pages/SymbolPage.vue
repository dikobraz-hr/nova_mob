<template>
  <q-page class="q-pa-md">
    <!-- <FullscreenAd ref="fullscreenAd"> -->
      <!-- Insert your actual ad iframe/component or ad code here -->
    <!-- </FullscreenAd> -->
    <!-- <q-btn label="Show Ad" @click="showFullScreenAd" /> -->
    <!-- <BannerAd @toggle-drawer="toggleDrawer" /> -->
    <q-btn flat icon="arrow_back" class="q-mb-md q-pa-md" @click="goBack" :label="categoryName" />
    <div v-if="symbol" v-touch-swipe="onSwipe">
      <div class="fit row no-wrap justify-between items-start content-start">
        <q-btn round icon="arrow_back" class="q-mb-md " color="secondary" text-color="dark" @click="goPrev" size="lg" />
        <q-btn round class="q-mb-md " color="accent" text-color="dark" @click="goRandom" size="lg"> <q-img
            src="wand.svg" width="35px" /></q-btn>
        <q-btn round icon="arrow_forward" class="q-mb-md" color="primary" text-color="dark" @click="goNext" size="lg" />

      </div>
      <SymbolImage :image="symbol?.image" :alt="translatedTitle" :sound="translatedSound" :onPlaySound="playSound"
        :background-color="categoryColor" />

      <SymbolInfo :symbol="symbol" :title="translatedTitle || 'Bez naziva'" :isFavorite="isFavorite"
        :onPlaySound="playSound" :onPlayMainSound="playMainSound" :onToggleFavorite="toggleFavorite"
        :isPlaying="isPlaying" :isPlayingMain="isPlayingMain" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// import FullscreenAd from 'components/FullscreenAd.vue';


import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import symbolsData from 'src/assets/symbols_data.json'
// import BannerAd from 'src/components/BannerAd.vue'
import SymbolImage from 'components/SymbolImage.vue'
import SymbolInfo from 'components/SymbolInfo.vue'
import { computed } from 'vue'
// const fullscreenAd = ref(null);


const translatedTitle = computed(() => symbol.value?.translations?.[locale.value]?.title)
const translatedSound = computed(() => symbol.value?.translations?.[locale.value]?.sound)

const route = useRoute()
const router = useRouter()

const { locale } = useI18n()


const categoryId = Number(route.params.categoryId)
const symbolId = computed(() => Number(route.params.symbolId))

const symbol = ref(null)
// const visitCount = ref(Number(localStorage.getItem('visitCount') || 0))
const categoryName = ref(null)
const categoryColor = ref('#ffffff')
const isFavorite = ref(false)
const isPlaying = ref(false);
const isPlayingMain = ref(false);
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
    categoryName.value = found.category.translations[locale.value].title;
    // visitCount.value++
    // localStorage.setItem('visitCount', visitCount.value)

    // if (visitCount.value % 5 === 0) {
    //   fullscreenAd.value?.showAd()
    // }

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
      isPlaying.value = false;
      isPlayingMain.value = false;
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(`/sounds/${locale.value}/${sound}`);
    isPlaying.value = true;
    currentAudio.play();
    currentAudio.onended = () => {
      isPlaying.value = false;
    };
    currentAudio.onerror = () => {
      isPlaying.value = false;
    };
  }
}

function playMainSound() {
  const sound = symbol.value?.sound;
  if (sound) {
    // Stop any currently playing audio
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      isPlayingMain.value = false;
      isPlaying.value = false;
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(`/sounds/descriptive/${sound}`);
    isPlayingMain.value = true;
    currentAudio.play();
    currentAudio.onended = () => {
      isPlayingMain.value = false;
    };
    currentAudio.onerror = () => {
      isPlayingMain.value = false;
    };
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
    isPlaying.value = false;
    isPlayingMain.value = false;
    currentAudio.currentTime = 0;
  }
  const symbolsInCategory = getSymbolsInCategory()
  const currentIndex = symbolsInCategory.findIndex((item) => item.id === symbolId.value)
  const nextIndex = (currentIndex + 1) % symbolsInCategory.length
  const nextSymbol = symbolsInCategory[nextIndex]
  router.push(`/symbol/${categoryId}/${nextSymbol.id}`)
}
function onSwipe({ direction }) {
  if (direction === 'left') {
    goNext()
  } else if (direction === 'right') {
    goPrev()
  }
}
function goRandom() {
  if (currentAudio) {
    currentAudio.pause();
    isPlaying.value = false;
    isPlayingMain.value = false;
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

  router.push(`/symbol/${categoryId}/${randomSymbol.id}`)
}
function goPrev() {
  if (currentAudio) {
    currentAudio.pause();
    isPlaying.value = false;
    isPlayingMain.value = false;
    currentAudio.currentTime = 0;
  }
  const symbolsInCategory = getSymbolsInCategory()
  const currentIndex = symbolsInCategory.findIndex((item) => item.id === symbolId.value)
  const prevIndex = (currentIndex - 1 + symbolsInCategory.length) % symbolsInCategory.length
  const prevSymbol = symbolsInCategory[prevIndex]
  router.push(`/symbol/${categoryId}/${prevSymbol.id}`)
}

</script>
