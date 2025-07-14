<template>
  <q-page class="q-pa-md">
    <div class="col-auto">
      <q-btn flat icon="arrow_back" @click="$router.push('/profile')" class="q-pa-md" />
    </div>
    <h2 class="text-h5 q-mb-md">{{ $t('termsTitle') }}</h2>
    <q-card class="q-pa-md">

            <p v-html="$t('termsList')"> </p>
            <p v-html="$t('termsList2')"> </p>
            <p v-html="$t('termsList3')"> </p>


    </q-card>
  </q-page>
</template>

<script setup>
//import { computed } from 'vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

watch(locale, val => console.log('Locale changed on terms page:', val))


</script>
