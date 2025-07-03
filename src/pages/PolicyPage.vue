<template>
  <q-page class="q-pa-md">
    <div class="col-auto">
      <q-btn flat icon="arrow_back" @click="$router.push('/profile')" class="q-pa-md" />
    </div>
    <h2 class="text-h5 q-mb-md">{{ $t('policyTitle') }}</h2>
    <q-card class="q-pa-md">
<p  v-for="(item, index) in privacyList"
          :key="index"
          v-html="item"></p>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t,locale } = useI18n()

watch(locale, val => console.log('Locale changed on policy page:', val))

const privacyList = computed(() => {
  // reference locale.value to make it reactive
  locale.value
  console.log(t('privacyList'))
  return Array.from({ length: 11 }, (_, i) => t(`privacyList.${i + 1}`))
})
</script>
