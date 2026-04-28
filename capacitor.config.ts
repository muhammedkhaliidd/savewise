import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.savewise.app',
  appName: 'save wise',
  webDir: 'dist/money-calculator/browser',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    Assets: {
      assetsDir: 'assets',
    },
  },
};

export default config;
