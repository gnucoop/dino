import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.gnucoop.dino.app',
  appName: 'DINO',
  webDir: 'dist/dinoapp',
  bundledWebRuntime: false,
  android: {
    webContentsDebuggingEnabled: true,
  },
};

export default config;
