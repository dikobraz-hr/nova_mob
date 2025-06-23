<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="updateValue"
  bg-color="white"
    rounded outlined
    clearable
    debounce="300"
  
 
    :label="$t('Search categories')"
    class="q-ma-md"
   
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
<style>
.q-field--outlined .q-field__control::before {
  border-color: #ff8a2550;
}
</style>
