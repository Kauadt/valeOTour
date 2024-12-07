import React, { useEffect, useState } from 'react';
import Routes from './src/routes';
import FlashMessage from 'react-native-flash-message';
import * as SplashScreen from 'expo-splash-screen';
import { AccessibilityInfo, Platform } from 'react-native';
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = async () => {
      const result = await AccessibilityInfo.isReduceMotionEnabled();
      setReducedMotion(result);
    };
    
    checkReducedMotion();
  }, []);

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        if (!__DEV__ && Platform.OS !== 'web') {
          const Updates = require('expo-updates');
          const { isAvailable } = await Updates.checkForUpdateAsync();

          if (isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded) {
          setAppReady(true);
          SplashScreen.hideAsync();
        }
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!appReady) {
    return null;
  }

  return (
    <>
      <Routes />
      <FlashMessage icon="auto" duration={5500} style={{ marginTop: 0 }} />
    </>
  );
}
