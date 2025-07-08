import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob'

async function showAds() {
  await AdMob.initialize()

  // Show banner ad
  await AdMob.showBanner({
    adId: 'ca-app-pub-3940256099942544/6300978111', // Test banner ID
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.TOP_CENTER,
    margin: 0,
    isTesting: true
  })

  // Prepare interstitial ad
  await AdMob.prepareInterstitial({
    adId: 'ca-app-pub-3940256099942544/1033173712', // Test interstitial ID
    isTesting: true
  })

  // Show interstitial after 5 seconds
  setTimeout(async () => {
    await AdMob.showInterstitial()
  }, 5000)
}

document.addEventListener('deviceready', showAds)
