import React, { useEffect } from "react";
import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Must be outside of any component LifeCycle (such as `componentDidMount`).
const RemotePushController = (props) => {
  useEffect(() => {
    if (Platform.OS === "android") {
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          // props.setAppToken(token)
          // dispatch(transaction.setFCMToken(token.token));

          AsyncStorage.setItem("FCMToken", token.token);
        },
        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
          if (notification.userInteraction) {
            // navigate('Notifications');
          }
        },
        // Android only: GCM or FCM Sender ID
        senderID: "42606366967",
        popInitialNotification: true,
        requestPermissions: true,
      });
    } else {
      PushNotificationIOS.requestPermissions();
      PushNotificationIOS.addEventListener("register", (token) => {
        const data = {
          token: token,
          os: "ios",
        };
        AsyncStorage.setItem("FCMToken", data.token);
      });
      PushNotificationIOS.getInitialNotification().then((notification) => {
        if (notification.userInteraction) {
          // navigate('Notifications');
        }
      });
    }
  }, []);
  return null;
};
export default RemotePushController;
