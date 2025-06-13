<template>
  <q-select
    v-model="selectedLang"
    :options="options"
    :label="$t('language')"
    
    rounded
    filled
    bg-color="white"
    emit-value
    map-options
    color="primary"
   
    @update:model-value="changeLanguage"
  >
  <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar class="q-pr-none" style="min-width: 40px;">
              <q-img
  :src="'https://hatscripts.github.io/circle-flags/flags/'+scope.opt.flag+'.svg'"
  width="30px"
  /> 
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ scope.opt.label }}</q-item-label>
             
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:selected-item="scope">
      
        <q-img
  :src="'https://hatscripts.github.io/circle-flags/flags/'+scope.opt.flag+'.svg'"
  width="30px" class="q-mr-sm q-my-sm"
  /> 
        {{ scope.opt.label }}
   
    </template>
  </q-select>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const selectedLang = ref(locale.value);
const rawLanguages = ref([]);
const options = ref([]);

onMounted(loadLanguages);
async function loadLanguages() {
  try {
    const res = await fetch('/languages.json');
    const data = await res.json();
    rawLanguages.value = data.languages;
    updateOptions();
  } catch (e) {
    console.error('Failed to load languages.json:', e);
  }
}
function updateOptions() {
  options.value = rawLanguages.value.map(lang => ({
    label: lang.labels[locale.value] || lang.code,
    value: lang.code,
    flag:lang.flag,
  }));
}

// 👇 Watch locale change and update labels dynamically
watch(locale, () => {
  updateOptions();
});
function changeLanguage(langCode) {
  locale.value = langCode;
  selectedLang.value = langCode;
  localStorage.setItem('appLocale', langCode); // ✅ save it persistently
}
</script>
