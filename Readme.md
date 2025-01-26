
## How to run this project
##### 1. Start server
```
cd server
npm start
```

##### 2. Setup client
2.1 Update Firebase Config on `client\hook\usePushNotification.js`
2.2 Update Firebase `firebase-service-account.json` on `PTAH_ADMIN_JAN68` project

##### 3. Start client (android)
3.1 Install java 17 [Download](https://www.openlogic.com/openjdk-downloads?field_java_parent_version_target_id=807&field_operating_system_target_id=All&field_architecture_target_id=All&field_java_package_target_id=All)
3.2 Set `JAVA_HOME=C:\Program Files\OpenLogic\jdk-17.0.13.11-hotspot`
3.3 Install Android API version `34.0.0`
3.4 Install NDK version `25.1.8937393`
3.5 Update SERVER_BASE_URL on `client\constant.js`
3.6 Start app 
```
cd client
npm run android
```