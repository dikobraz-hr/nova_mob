import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { defineStore } from 'pinia'
import { useRevenueCat } from 'boot/useRevenuCat.js'
const { setupRevenueCat, hasRemoveAds } = useRevenueCat()

await setupRevenueCat()

const adsDisabled = await hasRemoveAds()
localStorage.setItem('adsDisabled', adsDisabled ? 'true' : 'false')

export const useAds = defineStore('ads', {

  state: () => ({
    clickCount: 0,
    nextAdAt: getRandomClickTarget()
  }),
  actions: {
    async registerClick() {
      this.clickCount++
      if (!adsDisabled) {
      if (this.clickCount >= this.nextAdAt) {
        try {
          await AdMob.prepareInterstitial({
            adId: 'ca-app-pub-8386369441737725/7926092405', // Test Ad ID
            isTesting: true
          })
          await AdMob.showInterstitial()
        } catch (error) {
          console.warn('Interstitial ad failed:', error)
        }
        this.clickCount = 0
        this.nextAdAt = getRandomClickTarget()
      }
      }
    },
    async initializeAds() {
      if (!adsDisabled) {
        await AdMob.initialize()
      await AdMob.showBanner({
        adId: 'ca-app-pub-8386369441737725/2645845566', // Test Banner ID
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.TOP_CENTER,
        margin: 0,
        isTesting: true
      })
      }
    }
  }
})

function getRandomClickTarget() {
  return Math.floor(Math.random() * 9) + 7 // between 7 and 15
}


