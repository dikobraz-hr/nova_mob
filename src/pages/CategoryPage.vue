<template>
  <q-page class="q-pa-md">
    <q-btn flat icon="arrow_back" @click="$router.back()" class="q-mb-md" />

    <div class="text-h5 q-mb-md">{{ categoryName }}</div>

    <PojamGrid :pojmovi="pojmovi" @play-sound="playSound" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PojamGrid from '../components/PojamGrid.vue'

const route = useRoute()
const categoryId = Number(route.params.id)

const categoriesData = {
  1: { name: 'Životinje' },
  2: { name: 'Vozila' },
  3: { name: 'Hrana' },
}

const pojmoviData = {
  1: [
    { id: 1, text: 'Pas', },
    { id: 2, text: 'Mačka',  },
  ],
  2: [
    { id: 3, text: 'Auto',  },
    { id: 4, text: 'Bicikl',  },
  ],
  3: [
    { id: 5, text: 'Jabuka', },
    { id: 6, text: 'Banana',  },
  ],
}

const categoryName = ref('')
const pojmovi = ref([])

onMounted(() => {
  categoryName.value = categoriesData[categoryId]?.name || 'Nepoznata kategorija'
  pojmovi.value = pojmoviData[categoryId] || []
})

function playSound(url) {
  const audio = new Audio(url)
  audio.play()
}
</script>
