import { Purchases } from '@revenuecat/purchases-capacitor'

export default async () => {
  try {
    await Purchases.setup("goog_HKjChAarnqjoraXExqBAicSCGRD") // You can also pass a user ID as 2nd param
    console.log('[RevenueCat] Initialized')
  } catch (err) {
    console.error('[RevenueCat] Initialization error:', err)
  }
}
