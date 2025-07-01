<template>
  <q-dialog v-model="visible" persistent no-backdrop-dismiss no-esc-dismiss>
    <q-card class="fullscreen bg-primary text-white">
      <q-btn
        flat
        round
        dense
        icon="close"
        class="absolute-top-right q-ma-md"
        @click="closeAd"
        aria-label="Close ad"
      />
      <div class="q-pa-md flex flex-center" style="height: 100%;">
        <!-- Your ad content goes here -->
        <slot>
          <div class="text-h6">
            Fullscreen Ad Placeholder
          </div>
        </slot>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const visible = ref(false);

// Expose methods so parent can control the ad component
function showAd() {
  visible.value = true;
}

function closeAd() {
  visible.value = false;
}

defineExpose({ showAd, closeAd });
</script>

<style scoped>
.fullscreen {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh!important;
  border-radius: 0;
}
.absolute-top-right {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
