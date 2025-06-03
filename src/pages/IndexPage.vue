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
  router.push(`/category/${id}`)
}
function goToCategories() {
  router.push('/category')
}
function goToRandom() {
  router.push('/random-game')
}


function toggleDrawer() {
  console.log('Toggle drawer clicked')
}
</script>

<style scoped>
.top-header {
  max-width: 900px;
  margin: 0 auto 24px auto;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-split {
  flex: 1;
  display: flex;
  align-items: center;
}

.line {
  flex: 1;
  height: 1.5px;
  background-color: #ccc;
  border-radius: 1px;
  margin: 0 12px;
}

.header-title {
  font-weight: 700;
  font-size: 1.25rem;
  color: #555;
  white-space: nowrap;
  text-align: center;
}

.random-btn-wrapper {
  max-width: 900px;
  margin: 0 auto 48px auto;
  padding: 0 12px;
  display: flex;
  justify-content: center;
}

.random-btn {
  background-color: #7e57c2;
  color: white;
  font-weight: 600;
  padding: 8px 24px;
  transition: background-color 0.3s ease;
}

.random-btn:hover {
  background-color: #673ab7;
}

.favorites-header {
  max-width: 900px;
  margin: 0 auto 24px auto;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-all {
  user-select: none;
  color: #555;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.view-all span {
  margin-right: 4px;
}

.categories-grid {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.category-card {
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.category-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
