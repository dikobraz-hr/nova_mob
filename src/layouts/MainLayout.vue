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

<style scoped>
.bottom-toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #f0f0f0; 
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #ddd;
  z-index: 9999;
}

.toolbar-btn {
  background: none;
  border: none;
  outline: none;
  color: #777;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  transition: color 0.3s ease, background-color 0.3s ease;
  border-radius: 12px;
  position: relative;
  width: 64px;
  height: 64px;
  justify-content: center;
}

.toolbar-btn q-icon {
  font-size: 24px;
  margin-bottom: 2px;
}

.toolbar-btn:hover {
  color: #818e9b;
}

.toolbar-btn.active {
  color: #5e4b8b;
  background-color: #e5dbf8;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(94, 75, 139, 0.3);
  padding: 4px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, box-shadow 0.3s;
}

body {
  padding-bottom: 64px; 
}
</style>
