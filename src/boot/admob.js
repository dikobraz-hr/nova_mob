export default async () => {
  document.addEventListener('deviceready', async () => {
    if (!window.admob) return console.warn('AdMob not ready')

    await admob.start()

    // Example: Show a banner ad
    await admob.BannerAd.show({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
      position: 'top',
      size: 'SMART_BANNER',       // Other options: BANNER, LARGE_BANNER, MEDIUM_RECTANGLE, FULL_BANNER
      isTesting: true,            // Keep true during development,
      testDeviceIds: ['7d546f25-3961-43f3-aaff-846352fc7a00','b5b985c3-da56-4df9-8b13-b710c8b0d43a'],
    })
  }, false)
}
