import { boot } from 'quasar/wrappers'
import { useRevenueCat } from 'boot/useRevenuCat.js'

export default boot(async () => {
  const { setupRevenueCat, hasRemoveAds } = useRevenueCat()

  await setupRevenueCat()

  const adsDisabled = await hasRemoveAds()
  localStorage.setItem('adsDisabled', adsDisabled ? 'true' : 'false')
})
