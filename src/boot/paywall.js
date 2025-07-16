import { ref } from 'vue'
import { Purchases } from '@revenuecat/purchases-capacitor'

const offerings = ref(null)
const isLoading = ref(false)
const error = ref(null)

const loadOfferings = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await Purchases.getOfferings()
    offerings.value = response
  } catch (err) {
    error.value = err.message || 'Failed to load offerings'
  } finally {
    isLoading.value = false
  }
}

const purchasePackage = async (pkg) => {
  try {
    const result = await Purchases.purchasePackage({ purchasablePackage: pkg })
    // Check entitlement
    const hasRemoveAds = !!result.customerInfo.entitlements.active.remove_ads
    if (hasRemoveAds) {
      alert('Purchase successful! Ads will be removed.')
      // Here you can update your app state to disable ads
    }
  } catch (err) {
    if (!err.userCancelled) {
      alert('Purchase failed: ' + (err.message || 'Unknown error'))
    }
  }
}

// Example of a method to call when user clicks on a package in your paywall UI:
const onBuyClick = (pkg) => {
  purchasePackage(pkg)
}

// Call loadOfferings once your component is mounted or on some event:
loadOfferings()

export {
  offerings,
  isLoading,
  error,
  onBuyClick,
  loadOfferings
}
