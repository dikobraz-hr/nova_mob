import { boot } from 'quasar/wrappers'
import { StatusBar, Style } from '@capacitor/status-bar'
import { NavigationBar } from '@capgo/capacitor-navigation-bar';
export default boot(async () => {
  try {
    // Make the app appear below the status bar (not under it)
    await StatusBar.setOverlaysWebView({ overlay: false })

    // Optional: set light or dark status bar text
    await StatusBar.setStyle({ style: Style.Light })
    await NavigationBar.setOverlaysWebView({ overlay: false });
    // or: await StatusBar.setStyle({ style: Style.Dark })
  } catch (err) {
    console.log('StatusBar plugin not available:', err)
  }
})

