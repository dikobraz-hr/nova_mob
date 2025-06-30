<template>
  <q-page class="q-pa-md">
    <div class="col-auto">
      <q-btn flat icon="arrow_back" @click="$router.push('/contact')" class="q-pa-md" />
    </div>
    <h2 class="text-h5 q-mb-md">{{ $t('termsTitle') }}</h2>
    <q-card class="q-pa-md">
     <p>{{ $t('termsIntro') }}</p>
<ul>
  <li>{{ $t('termsList.1') }}</li>
  <li>{{ $t('termsList.2') }}</li>
  <li>{{ $t('termsList.3') }}</li>
  <li>{{ $t('termsList.4') }}</li>
</ul>
    </q-card>
  </q-page>
</template>

<script setup>
</script>
