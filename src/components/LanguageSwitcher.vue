<template>
  <q-select
    v-model="selectedLang"
    :options="options"
    :label="$t('language')"
    dense
    outlined
    emit-value
    map-options
    @update:model-value="changeLanguage"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const selectedLang = ref(locale.value);
const options = ref([]);

onMounted(async () => {
  try {
    const res = await fetch('/languages.json');
    const data = await res.json();
    options.value = data.languages.map(lang => ({
      label: lang.labels[locale.value] || lang.code,
      value: lang.code
    }));
  } catch (e) {
    console.error('Failed to load languages.json:', e);
  }
});

function changeLanguage(langCode) {
  locale.value = langCode;
  selectedLang.value = langCode;
  localStorage.setItem('appLocale', langCode); // ✅ save it persistently
}
</script>
