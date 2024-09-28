import type { CapacitorConfig } from '@capacitor/cli';
import os from 'os';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'nextjs chatbot',
  webDir: 'out',
  plugins: {
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: '#000000',
      statusBarContent: 'light',
      navigationBarColor: '#000000',
      navigationBarContent: 'light',
      offset: 0,
    },
  },
};

// sets up Capacitor Live Reload
// https://capacitorjs.com/docs/guides/live-reload#using-with-framework-clis
function liveReload() {
  // dynamically gets local IP address
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    if (interfaces) {
      for (const iface of interfaces) {
        if (iface.family === 'IPv4' && !iface.internal) {

            console.log(process.env)
            const port = 3000
            console.log(`Setting up Capacitor Live Reload at ${iface.address}:${port}`)
            return {
                url: `http://${iface.address}:${port}`,
                cleartext: true
          }
        }
      }
    }
  }

  return null; // If no address is found
}

const liveReloadConfig = liveReload();
if (liveReloadConfig) {
  config.server = liveReloadConfig;
}

export default config;
