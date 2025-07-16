import { Purchases } from '@revenuecat/purchases-capacitor'
import { Capacitor } from '@capacitor/core'

const apiKey = Capacitor.getPlatform() === 'ios'
    ? 'your_ios_public_sdk_key'
    : 'goog_HKjChAarnqjoraXExqBAicSCGRD'

export const useRevenueCat = () => {
  const setupRevenueCat = async (userId = null) => {
    await Purchases.setLogLevel({ level: Purchases.LOG_LEVEL.DEBUG })
    await Purchases.configure({ apiKey, appUserID: userId })
  }

  const hasRemoveAds = async () => {
    const info = await Purchases.getCustomerInfo()
    return !!info.customerInfo.entitlements.active.remove_ads
  }

  const purchaseRemoveAds = async () => {
    const offerings = await Purchases.getOfferings()
    if (!offerings.current) {
      throw new Error('No current offerings available')
    }
    const pkg = offerings.current?.availablePackages?.find(p => p.identifier === 'remove_ads')
    if (!pkg) {
      throw new Error('No available packages found')
    }
    const result = await Purchases.purchasePackage({ purchasablePackage: pkg })
    return !!result.customerInfo.entitlements.active.remove_ads
  }

  return {
    setupRevenueCat,
    hasRemoveAds,
    purchaseRemoveAds
  }
}
