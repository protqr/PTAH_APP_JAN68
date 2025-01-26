import { Platform, Alert } from 'react-native';
import { initializeApp } from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import { FIREBASE_TOPIC } from '../constant';

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

const requestUserPermission = async () => {
    const isAndroid = Platform.OS === 'android';
    if (isAndroid) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    const authStatus = await messaging().requestPermission();
    if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
        console.log('Notification Permission Status:', authStatus);
    } else {
        Alert.alert('Permission Denied', 'Push notifications require permission!');
    }
};

export const usePushNotification = () => {
    const subscribe = async () => {
        // Request permission for push notifications
        await requestUserPermission();

        // Subscribe to a topic
        await messaging()
            .subscribeToTopic(FIREBASE_TOPIC.ALL)
            .then(() => console.log(`Subscribed to topic: ${FIREBASE_TOPIC.ALL}`));

        // Listen to messages when the app is in the foreground
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log("🚀  Received remoteMessage:", remoteMessage);
            Alert.alert(remoteMessage.notification?.title, remoteMessage.notification?.body);
        });

        return unsubscribe; // Return unsubscribe function to be called for cleanup
    };

    return { subscribe };
};