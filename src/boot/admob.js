document.addEventListener('deviceready', async () => {
  console.log("Device ready");
  try {
    if (!admob) throw new Error("AdMob plugin not available");

    await admob.start();


    const banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
      adSize: 'BANNER',
      position: 'top'
    });


    await banner.show();

  } catch (err) {
    console.error("AdMob error:", err);
  }
  const interstitial = new admob.InterstitialAd({
    adUnitId: 'ca-app-pub-3940256099942544/1033173712'  // ✅ Test interstitial ad unit
  });

  await interstitial.load();
  console.log("Interstitial ad loaded");

  // Show Interstitial after delay or event
  setTimeout(async () => {
    if (await interstitial.isLoaded()) {
      await interstitial.show();
      console.log("Interstitial ad shown");
    }
  }, 5000);  // Show interstitial after 5 seconds (adjust as needed)

});

