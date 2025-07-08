import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob'

AdMob.initialize()

AdMob.showBanner({
  adId: 'ca-app-pub-3940256099942544/6300978111', // Test ID
  adSize: BannerAdSize.BANNER,
  position: BannerAdPosition.TOP_CENTER,
  margin: 0,
  isTesting: true
})
