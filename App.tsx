import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenExpo from 'expo-splash-screen';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { AuthProvider } from '@context/AuthContext';
import { LocationProvider } from '@context/LocationContext';
import { RootNavigator } from '@navigation/RootNavigator';
import { SplashScreen } from '@screens/SplashScreen';

// Keep the splash screen visible while we fetch resources
SplashScreenExpo.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);

        // Simulate resource loading
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // Hide the native splash screen
      await SplashScreenExpo.hideAsync();
    }
  }, [appIsReady]);

  const handleSplashFinish = () => {
    setShowCustomSplash(false);
  };

  if (!appIsReady) {
    return null;
  }

  // Show custom splash screen with Lottie animation
  if (showCustomSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <LocationProvider>
          <RootNavigator onReady={onLayoutRootView} />
          <StatusBar style="auto" />
        </LocationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
