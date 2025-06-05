<template>
  <div class="q-gutter-md" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));">
    <SymbolCard
      v-for="pojam in pojmovi"
      :key="pojam.id"
      :pojam="pojam"
      @play-sound="$emit('play-sound', $event)"
    />
  </div>
</template>

<script setup>
import SymbolCard from './SymbolCard.vue'

defineProps({
  pojmovi: {
    type: Array,
    required: true
  }
})

defineEmits(['play-sound'])
</script>
