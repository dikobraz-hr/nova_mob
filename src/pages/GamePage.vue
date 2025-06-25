<template>
  <q-page class="q-pa-md">
    <q-btn flat icon="arrow_back" class="q-mb-md q-pa-md" @click="goBack" />
    <div v-if="symbol" v-touch-swipe="goRandom">
      <div class="fit row wrap justify-center items-start content-start">
        <q-btn round  class="q-mb-md "  color="accent" text-color="dark" @click="goRandom" size="lg">  <q-img src="wand.svg"  width="35px" /></q-btn>
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
         :isPlaying="isPlaying"
      :isPlayingMain="isPlayingMain"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import symbolsData from 'src/assets/symbols_data.json'
import SymbolImage from 'components/SymbolImage.vue'
import SymbolInfo from 'components/SymbolInfo.vue'

const router = useRouter()
const { locale } = useI18n()

const symbol = ref(null)
const categoryColor = ref('#ffffff')
const isFavorite = ref(false)

const translatedTitle = computed(() => symbol.value?.translations?.[locale.value]?.title)
const translatedSound = computed(() => symbol.value?.translations?.[locale.value]?.sound)
const isPlaying = ref(false);
const isPlayingMain = ref(false);

function getAllSymbols() {
  return symbolsData
}

function loadRandomSymbol() {
  const symbols = getAllSymbols()
  if (symbols.length === 0) return

  let randomSymbol
  do {
    const randomIndex = Math.floor(Math.random() * symbols.length)
    randomSymbol = symbols[randomIndex]
  } while (symbol.value && randomSymbol.id === symbol.value.id) // avoid repeat

  symbol.value = randomSymbol
  console.log(randomSymbol)
  categoryColor.value = randomSymbol.category?.color+ '80' || '#ffffff'
}

onMounted(() => {
  loadRandomSymbol()
})

function goRandom() {
   if (currentAudio) {
      currentAudio.pause();
      isPlaying.value = false;
      isPlayingMain.value = false;
      currentAudio.currentTime = 0;
    }
  loadRandomSymbol()
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
  router.back()
}
</script>
