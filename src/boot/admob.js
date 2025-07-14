import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { defineStore } from 'pinia'


export const useAds = defineStore('ads', {
  state: () => ({
    clickCount: 0,
    nextAdAt: getRandomClickTarget()
  }),
  actions: {
    async registerClick() {
      this.clickCount++
      if (this.clickCount >= this.nextAdAt) {
        try {
          await AdMob.prepareInterstitial({
            adId: 'ca-app-pub-3940256099942544/1033173712', // Test Ad ID
            isTesting: true
          })
          await AdMob.showInterstitial()
        } catch (error) {
          console.warn('Interstitial ad failed:', error)
        }
        this.clickCount = 0
        this.nextAdAt = getRandomClickTarget()
      }
    },
    async initializeAds() {
      await AdMob.initialize()
      await AdMob.showBanner({
        adId: 'ca-app-pub-3940256099942544/6300978111', // Test Banner ID
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.TOP_CENTER,
        margin: 0,
        isTesting: true
      })
    }
  }
})

function getRandomClickTarget() {
  return Math.floor(Math.random() * 9) + 7 // between 7 and 15
}


