<template>
  <q-layout view="hHh lpR fff">
<div class="row">
  
  <div class="col-12 justify-center items-center text-center">
    <router-link to="/"> <q-img src="horizontal-logo.png" width="200px" class="q-mt-lg q-mx-auto block"></q-img></router-link>
  </div>
</div>
 

   

    <q-page-container class="q-pb-xl q-mb-lg">
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
        <span>{{$t('home')}}</span>
      </button>

      <button
        class="toolbar-btn"
        :class="{ active: activeTab === 1 }"
        @click="goTo('/category-all')"
        aria-label="Categories"
      >
        <q-icon name="category" />
        <span>{{$t('Categories')}}</span>
      </button>
 <button
        class="toolbar-btn"
        :class="{ active: activeTab === 3 }"
        @click="goTo('/game')"
        aria-label="game"
      >
<div class="custom-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M182.15-140 140-182.15 445.23-488l-174.84-43.08L453-644.46 437.16-860l164.76 139.08L801-802l-80.08 199.69L860-438.16 644.46-453l-114 182.61L487-445.23 182.15-140Zm23.62-523.85L140-729.62l65.77-65.76 65.77 65.76-65.77 65.77ZM555-422.61l57.23-93.24 109.54 8.16L651-591.77l41.16-101.39L590.77-652l-84.08-70.16 8.16 108.93L422-555.38l106.15 26.23L555-422.61ZM729.62-140l-65.77-65.77 65.77-65.77 65.76 65.77L729.62-140ZM572.08-572.69Z"/></svg>
     </div>   <span>{{$t('Game')}}</span>
      </button>
      <button
        class="toolbar-btn"
        :class="{ active: activeTab === 2 }"
        @click="goTo('/profile')"
        aria-label="Profile"
      >
        <q-icon name="person" />
        <span>{{$t('profile')}}</span>
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
    if (newPath.startsWith('/category-all') || newPath.startsWith('/category') || newPath.startsWith('/symbol')) {
      activeTab.value = 1
    } else if (newPath === '/') {
      activeTab.value = 0
    } else if (newPath.startsWith('/profile') || newPath.startsWith('/terms') || newPath.startsWith('/instructions')) {
      activeTab.value = 2
    }else if (newPath === '/game') {
      activeTab.value = 3
    } else {
      activeTab.value = -1
    }
  },
  { immediate: true }
)
</script>
<style>
.q-page{
min-height:calc(100vh - 90px -90px)!important
}
</style>
<style scoped>
.hamburger-btn {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 4001; /*.qdrawer po defaultu ima zindex 1000, a na mobile 3000 */
}

.bottom-toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* height: 64px; */
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-around;
  align-items: center;
 padding: 10px 5px;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #ddd;
  z-index: 5000;
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
.q-icon{
  width: 1em;
}
.toolbar-btn .q-icon {
  font-size: 20px;
  width: 40px;
  height: 40px;
  margin-bottom: 2px;
  margin-top: 10px;
  padding: 0 1px 2px;
}
.custom-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 2px;
  margin-top: 10px;
  padding: 6px 7px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: rgb(119, 119, 119);
}

.custom-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
  transition: background-color 0.3s ease, fill 0.3s ease;
}

.toolbar-btn.active .custom-icon {
  color: #fff;
  background-color: #ff8a25;
  border-radius: 50%;

}

.toolbar-btn:hover {
  color: #818e9b;
}

.toolbar-btn.active .q-icon{
  color: #fff;
  background-color: #ff8a25;
  border-radius: 50%;
 
}


.drawer-content {
  padding-top: 40px;
}

h6 {
  margin: 12px;
}

</style>
