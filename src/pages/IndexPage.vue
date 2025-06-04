<template>
  <q-page class="q-pa-md bg-grey-2">

    <!-- Gornji header sa hamburger menijem, ak je potreban ko u demu -->
    <div class="top-header row items-center q-pa-sm" style="max-width: 900px; margin: 0 auto;">


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
/*
import TopHeader from '../components/TopHeader.vue'
import RandomButton from '../components/RandomButton.vue'
import FavoritesHeader from '../components/FavoritesHeader.vue'
import CategorySlider from '../components/CategorySlider.vue'
import CategoryButtonSlider from '../components/CategoryButtonSlider.vue'
*/
const router = useRouter()

const categories = ref([
  { id: 1, name: 'Obitelj', image:'/symbols/baby.svg'},
  { id: 2, name: 'Životinje',  image:'/symbols/girl.svg' },
  { id: 3, name: 'Vozila', image:'/symbols/mom.svg'},
  { id: 4, name: 'Hrana', image:'/symbols/dad.svg' },
  { id: 5, name: 'Dijelovi tijela', image:'/symbols/friend.svg' }
])

function goToRandom() {
  router.push('/random-game')
}

function goToCategories() {
  router.push('/category-all')
}

function goToCategory(id) {
  router.push(`/category-all/${id}`)
}


</script>


<style scoped>
.q-page {
  max-width: 900px;
  margin: 0 auto;
}
</style>

<style scoped lang="scss" src="../css/index.scss"></style>

