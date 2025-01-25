import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { initializeApp } from '@react-native-firebase/app';
import RootNavigation from './navigation';
import { useFonts } from 'expo-font';
import FirebaseNotification from './components/notifications/FirebaseNotification';

const firebaseConfig = {
  apiKey: "AIzaSyBqff8uZJOupcVUSQxh84ea4DVfzrfPxVI",
  authDomain: "john-personal-c4cbf.firebaseapp.com",
  projectId: "john-personal-c4cbf",
  storageBucket: "john-personal-c4cbf.firebasestorage.app",
  messagingSenderId: "276068174406",
  appId: "1:276068174406:web:3d5c3076db9350b7861847",
  databaseURL: ""
};

initializeApp(firebaseConfig);

export default function App () {
  let [fontsLoaded] = useFonts({
    // นำเข้าฟอนต์และระบุชื่อฟอนต์ที่ใช้งาน
    Kanit: require('./assets/fonts/Kanit-Regular.ttf'),
    // สามารถเพิ่มฟอนต์อื่น ๆ ตามต้องการได้ที่นี่
  });


  return (
    <NavigationContainer>
      <RootNavigation />
      <FirebaseNotification />
    </NavigationContainer>
  );
}

