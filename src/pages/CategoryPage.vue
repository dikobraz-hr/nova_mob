<template>
  <q-page class="q-pa-md">
    <q-btn flat icon="arrow_back" @click="$router.back()" class="q-mb-md" />

    <div class="text-h5 q-mb-md">{{ categoryName }}</div>

    <div class="q-gutter-md" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));">
      <q-card v-for="pojam in pojmovi" :key="pojam.id" class="my-card">
        <q-img :src="pojam.image" style="height: 120px" />
        <q-card-section>
          <div>{{ pojam.text }}</div>
          <q-btn icon="volume_up" flat round @click="playSound(pojam.sound)" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryId = Number(route.params.id)

const categoriesData = {
  1: { name: 'Životinje' },
  2: { name: 'Vozila' },
  3: { name: 'Hrana' },
}

const pojmoviData = {
  1: [
    { id: 1, text: 'Pas' },
    { id: 2, text: 'Mačka' },
  ],
  2: [
    { id: 3, text: 'Auto' },
    { id: 4, text: 'Bicikl' },
  ],
  3: [
    { id: 5, text: 'Jabuka' },
    { id: 6, text: 'Banana'},
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
