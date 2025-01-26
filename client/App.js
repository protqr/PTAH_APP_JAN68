import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation';
import { useFonts } from 'expo-font';
import { usePushNotification } from './hook/usePushNotification';

export default function App () {
  let [fontsLoaded] = useFonts({
    // นำเข้าฟอนต์และระบุชื่อฟอนต์ที่ใช้งาน
    Kanit: require('./assets/fonts/Kanit-Regular.ttf'),
    // สามารถเพิ่มฟอนต์อื่น ๆ ตามต้องการได้ที่นี่
  });

  const { subscribe } = usePushNotification();

  useEffect(() => {
    const unsubscribe = subscribe();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}

