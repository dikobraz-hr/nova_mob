import { Purchases } from '@revenuecat/purchases-capacitor'

export function usePaywall() {
  const showPaywall = async () => {
    try {
      const offerings = await Purchases.getOfferings()

      if (!offerings.current?.identifier) {
        console.warn('[RevenueCat] No current offering')
        return
      }

      const result = await Purchases.presentPaywall(offerings.current.identifier)
      console.log('[RevenueCat] Paywall result:', result)

      const customerInfo = await Purchases.getCustomerInfo()
      const entitlementId = 'remove_ads' // Replace with your RevenueCat entitlement ID

      const isPro = !!customerInfo.entitlements.active[entitlementId]

      if (isPro) {
        console.log('[RevenueCat] User has Pro access')
        // Trigger premium access
      } else {
        console.log('[RevenueCat] No active subscription')
      }
    } catch (err) {
      console.error('[RevenueCat] Error showing paywall:', err)
    }
  }

  return {
    showPaywall
  }
}
