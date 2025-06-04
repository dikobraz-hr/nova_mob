<template>
  <q-card class="my-card">
    <q-img :src="pojam.image" style="height: 120px" />
    <q-card-section>
      <div>{{ pojam.text }}</div>
      <q-btn icon="volume_up" flat round @click="$emit('play-sound', pojam.sound)" />
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  pojam: {
    type: Object,
    required: true
  }
})
</script>
