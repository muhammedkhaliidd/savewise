import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.savewise.app',
  appName: 'save wise',
  webDir: 'dist/money-calculator/browser',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.1.40:4200',
    cleartext: true,
  },
  plugins: {
    Assets: {
      assetsDir: 'assets',
    },
  },
};

export default config;
