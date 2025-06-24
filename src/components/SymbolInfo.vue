<template>
  <div class="info-row">
    <div class="symbol-title">{{ title }}</div>
    <div class="icon-buttons">
      <q-btn round icon="record_voice_over" @click="onPlaySound" color="primary" text-color="dark" size="lg" :class="{ playing: isPlaying }"/>
      <q-btn round icon="volume_up" @click="onPlayMainSound" v-if="symbol.sound" size="lg" color="secondary" text-color="dark" :class="{ playingMain: isPlayingMain }"/>
      <!-- <q-btn
        flat
        round
        :icon="isFavorite ? 'favorite' : 'favorite_border'"
        color="red"
        @click="onToggleFavorite"
      /> -->
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
  onToggleFavorite: Function,
  isPlaying: Boolean,
  isPlayingMain: Boolean
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
.icon-buttons  .q-btn--round{

  border-radius: 50%;
  padding: 0;
  min-width: 3em;
  max-width: 64px;
  min-height: 3em;

}
.playing,.playingMain {
  animation: pulse 1s infinite;

}
.playing{
  box-shadow: 0 0 2px 2px #ff8b25c1;

}
.playingMain{
  box-shadow: 0 0 2px 2px #8be9ffc1;

}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
