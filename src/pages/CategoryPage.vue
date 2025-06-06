<template>
  <q-page class="q-pa-md bg-grey-2">
    <q-btn flat icon="arrow_back" @click="$router.back()" class="q-mb-md" />

    <div class="text-h5 q-mb-md" :style="{ color: categoryColor }">
      {{ categoryName }}
    </div>

    <div class="pojam-list">
      <q-card
        v-for="pojam in pojmovi"
        :key="pojam.id"
        clickable
        @click="goToPojam(pojam)"
        class="pojam-card"
        :style="{ backgroundColor: pojam.category?.color || '#ffffff' }"
      >
        <q-img
          :src="`/symbols/${pojam.image || 'default.svg'}`"
          style="height: 140px"
        />
        <div class="pojam-name">
          {{ pojam.translations.hr?.title || 'Bez naziva' }}
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import rawData from 'src/assets/symbols_data.json'

const route = useRoute()
const router = useRouter()
const categoryId = Number(route.params.id)

const categoryName = ref('Nepoznata kategorija')
const categoryColor = ref('#ffffff')
const pojmovi = ref([])

onMounted(() => {
  pojmovi.value = rawData.filter((item) => item.category?.id === categoryId)

  if (pojmovi.value.length > 0) {
    const cat = pojmovi.value[0].category
    categoryName.value = cat.translations.hr?.title || 'Nepoznata kategorija'
    categoryColor.value = cat.color || '#ffffff'
  }
})

function goToPojam(pojam) {
  router.push(`/pojam/${pojam.category.id}/${pojam.id}`)
}
</script>

<style scoped>
.pojam-list {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.pojam-card {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  position: relative;
}

.pojam-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pojam-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.3);
  color: #222;
  padding: 8px 12px;
  font-weight: 600;
  font-size: 1.1rem;
  backdrop-filter: blur(8px);
  user-select: none;
}
</style>
