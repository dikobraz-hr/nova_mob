<template>
  <q-layout view="hHh lpR fff">

    <q-page-container>
      <router-view />
    </q-page-container>

    <div class="bottom-toolbar">
      <button
        class="toolbar-btn"
        :class="{ active: activeTab === 0 }"
        @click="goTo('/')"
        aria-label="Home"
      >
        <q-icon name="home" />
        <span>Početna</span>
      </button>

      <button
        class="toolbar-btn"
        :class="{ active: activeTab === 1 }"
        @click="goTo('/category-all')"
        aria-label="Categories"
      >
        <q-icon name="category" />
        <span>Kategorije</span>
      </button>

      <button
        class="toolbar-btn"
        :class="{ active: activeTab === 2 }"
        @click="goTo('/account/1')"
        aria-label="Profile"
      >
        <q-icon name="person" />
        <span>Profil</span>
      </button>
    </div>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTab = ref(0)

const goTo = (path) => {
  router.push(path)
}

watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith('/category-all')) {
      activeTab.value = 1
    } else if (newPath === '/') {
      activeTab.value = 0
    } else if (newPath.startsWith('/account')) {
      activeTab.value = 2
    } else {
      activeTab.value = -1
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss" src="../css/mainLayout.scss"></style>
