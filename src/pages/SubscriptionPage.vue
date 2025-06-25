<template>
  <q-page class="q-pa-md">
    <q-btn label="Subscribe" color="primary" @click="subscribe" />
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.addEventListener('deviceready', initPurchases, false)
})

async function initPurchases() {
  const Purchases = window.Purchases
  Purchases.setDebugLogsEnabled(true)
  Purchases.configure({
    apiKey: 'goog_HKjChAarnqjoraXExqBAicSCGRD',
  })
}

async function subscribe() {
  const offerings = await window.Purchases.getOfferings()
  const current = offerings.current

  if (current && current.availablePackages.length > 0) {
    const selected = current.availablePackages[0]

    try {
      const result = await window.Purchases.purchasePackage(selected)
      const info = result.customerInfo

      if (info.entitlements.active['premium']) {
        alert('Subscription successful!')
      }
    } catch (e) {
      console.error('Purchase error:', e)
    }
  } else {
    alert('No subscription packages available.')
  }
}
</script>
