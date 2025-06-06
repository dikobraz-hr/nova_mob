<template>
  <div class="info-row">
    <div class="symbol-title">{{ title }}</div>
    <div class="icon-buttons">
      <q-btn flat round icon="volume_up" @click="onPlaySound" />
      <q-btn flat round icon="volume_down" @click="onPlayMainSound" v-if="symbol.sound"/>
      <q-btn
        flat
        round
        :icon="isFavorite ? 'favorite' : 'favorite_border'"
        color="red"
        @click="onToggleFavorite"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  symbol:Object,
  isFavorite: Boolean,
  onPlaySound: Function,
  onPlayMainSound:Function,
  onToggleFavorite: Function
})
</script>

<style scoped>
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.symbol-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.icon-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
