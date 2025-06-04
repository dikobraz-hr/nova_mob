<template>
  <q-page class="q-pa-md bg-grey-2">

    <!-- Gornji header sa hamburger menijem, ak je potreban ko u demu -->
    <div class="top-header row items-center q-pa-sm" style="max-width: 900px; margin: 0 auto;">
      <q-btn
        flat
        dense
        round
        icon="menu"
        @click="toggleDrawer"
        aria-label="Meni"
      />
    </div>

    <!-- Nasumičan odabir gumb, za nasumicnu rijec -->
    <div class="random-btn-wrapper">
      <q-btn
        label="Nasumičan odabir"
        class="random-btn"
        rounded
        unelevated
        color="purple"
        @click="goToRandom"
      />
    </div>

    <div class="favorites-header row items-center justify-between q-mb-md" style="max-width: 900px; margin: 0 auto; width: 100%;">
      <div class="text-h6 text-weight-bold">Favoriti</div>
      <div
        class="view-all cursor-pointer text-dark"
        @click="goToCategories"
      >
        <span>Pogledaj sve</span>
        <q-icon name="keyboard_arrow_down" size="24px" />
      </div>
    </div>

    <!-- Draggable kategorije, po vlastitoj preferenci -->
    <draggable
      v-model="categories"
      item-key="id"
      animation="200"
      group="categories"
      class="categories-grid"
    >
      <template #item="{ element }">
        <q-card
          class="category-card"
          clickable
          @click="goToCategory(element.id)"
          style="cursor: grab;"
        >
          <q-img :src="element.image" style="height: 140px" />
          <q-card-section>
            <div class="text-h6">{{ element.name }}</div>
          </q-card-section>
        </q-card>
      </template>
    </draggable>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import draggable from 'vuedraggable'

const router = useRouter()

const categories = ref([
  { id: 1, name: 'Životinje'},
  { id: 2, name: 'Vozila' },
  { id: 3, name: 'Hrana' },
])

function goToCategory(id) {
  router.push(`/category-all/${id}`)
}
function goToCategories() {
  router.push('/category-all')
}
function goToRandom() {
  router.push('/random-game')
}


function toggleDrawer() {
  console.log('Toggle drawer clicked')
}
</script>

<style scoped lang="scss" src="../css/index.scss"></style>
