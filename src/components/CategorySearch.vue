<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="updateValue"
    outlined
    dense
    debounce="300"
    placeholder="Pretraži kategorije..."
    class="q-my-md"
    style="max-width: 900px; margin: 0 auto;"
  >
    <template #prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const { modelValue } = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateValue(val) {
  emit('update:modelValue', val)
}
</script>
