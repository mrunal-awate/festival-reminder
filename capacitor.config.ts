import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mrunal.festivalreminder',
  appName: 'Festival Reminder',
  webDir: 'public',
  server: {
    url: 'https://festival-reminder.vercel.app',
    cleartext: false
  }
};

export default config;