<template>
  <q-page class="q-pa-md">
    <div class="col-auto">
      <q-btn flat icon="arrow_back" @click="$router.push('/contact')" class="q-pa-md" />
    </div>
    <h2 class="text-h5 q-mb-md">{{ $t('howToUse') }}</h2>
    <q-card class="q-pa-md q-mb-md">
     <p>{{ $t('welcome') }}</p>
<ul>
  <li>{{ $t('instruction.menu') }}</li>
  <li>{{ $t('instruction.tapSymbol') }}</li>
  <li>
    {{ $t('instruction.randomSymbol') }}
    <q-img src="wand.svg" width="35px" />
  </li>
  <li>
    {{ $t('instruction.switchLanguage') }}
    <q-icon name="person" style="width:35px;font-size:32px;" />
  </li>
</ul>
    </q-card>
  </q-page>
</template>

<script setup>
</script>
