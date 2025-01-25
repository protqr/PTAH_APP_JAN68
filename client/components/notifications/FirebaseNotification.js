import { useEffect } from "react";
import { Platform, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import { FIREBASE_TOPIC } from "../../constant";

const requestUserPermission = async () => {
  const isAndroid = Platform.OS === 'android'
  if (isAndroid) {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }

  const authStatus = await messaging().requestPermission();
  if (authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    console.log('Notification Permission Status:', authStatus);
  } else {
    Alert.alert('Permission Denied', 'Push notifications require permission!');
  }
};

export default function FirebaseNotification () {
  useEffect(() => {
    // Request permission for push notifications
    requestUserPermission();

    // Subscribe to a topic
    messaging()
      .subscribeToTopic(FIREBASE_TOPIC.ALL)
      .then(() => console.log(`Subscribed to topic: ${FIREBASE_TOPIC.ALL}`));

    // Listen to messages when the app is in the foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("🚀  Received remoteMessage:", remoteMessage)
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });

    return unsubscribe; // Clean up the listener
  }, []);

  return <></>
}

