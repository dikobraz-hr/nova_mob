<template>
  <q-page class="q-pa-md">
    <div class="col-auto">
      <q-btn flat icon="arrow_back" @click="$router.push('/contact')" class="q-pa-md" />
    </div>
    <h2 class="text-h5 q-mb-md">{{ $t('termsTitle') }}</h2>
    <q-card class="q-pa-md">
     <p>{{ $t('termsIntro') }}</p>
<ol>

        <li
          v-for="(item, index) in termsList"
          :key="index"
          v-html="item"></li>
     
</ol>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t,locale } = useI18n()

watch(locale, val => console.log('Locale changed on terms page:', val))

const termsList = computed(() => {
  // reference locale.value to make it reactive
  locale.value
  return Array.from({ length: 10 }, (_, i) => t(`termsList.${i + 1}`))
})
</script>
