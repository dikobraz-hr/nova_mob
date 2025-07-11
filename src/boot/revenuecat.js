import { Purchases } from '@revenuecat/purchases-capacitor'

await Purchases.configure({ apiKey: 'goog_HKjChAarnqjoraXExqBAicSCGRD' })
await Purchases.setDebugLogsEnabled(true)

const offerings = await Purchases.getOfferings()
console.log('Offerings:', offerings)

if (offerings.current) {
  await Purchases.presentPaywall(offerings.current.identifier)
} else {
  console.warn('No offering found')
}
