import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, Platform, Button } from "react-native";
import { WEB_URL } from "../config.js";
import { UserContext } from "../UserContext.js";
import * as SecureStore from "expo-secure-store";

export default function NotificationTest() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync("bntanga").then((token) =>
      setExpoPushToken(token)
    );
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    // return () => {
    //   Notifications.removeAllNotificationListeners();
    // };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification &&
            JSON.stringify(notification.request.content.data.body)}
        </Text>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View>
    </View>
  );
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Received MITCoins",
    body: "Aron Ricardo Perez-Lopez has sent you 15 MITCoins!",
    data: { data: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications

async function registerForPushNotificationsAsync(kerberos) {
  //   let token = await fetch(
  //     `${WEB_URL}api/get_notification_token?kerberos=kerberos`
  //   );
  //   let tokenJSON = await token.json();
  //   if (tokenJSON.notificationToken !== "") {
  //     console.log("this is response token " + tokenJSON.notificationToken);
  //     return tokenJSON.notificationToken;
  //   }

  console.log("we in function");
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      //in case permission is being asked for again
      finalStatus = status;
      if (status === "granted") {
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("after asking for permission");
        request_and_set_new_expo_token(token, kerberos);
        return;
      }
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    let tokenCheck = await SecureStore.getItemAsync("notificationToken");
    if (tokenCheck !== null) {
      console.log("found token " + tokenCheck);
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
      //   tokenCheck = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("after getting from secure store");
      console.log("this is token check " + tokenCheck);
      //   request_and_set_new_expo_token(tokenCheck, kerberos);
      return tokenCheck;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("notification token is" + token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  request_and_set_new_expo_token(token, kerberos);
}

async function request_and_set_new_expo_token(token, kerberos) {
  console.log("this is token function is receiving " + token);
  let body = JSON.stringify({
    notificationToken: token,
    // kerberos: contextObject.user.kerberos,
    kerberos: kerberos,
  });
  console.log("Notifications--" + "body being sent: " + body);

  let response = await fetch(`${WEB_URL}api/set_notification_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });

  console.log("done fetching");
  //   console.log("this is weird response" + JSON.stringify(response));
  let responseJSON = await response.json();

  //   console.log(" Notifications-- " + "user: " + JSON.stringify(responseJSON));
  //   console.log(
  //     "this should be token" + JSON.stringify(responseJSON.user.notificationToken)
  //   );
  await SecureStore.setItemAsync(
    "notificationToken",
    responseJSON.user.notificationToken
  );
  return responseJSON.notificationToken;
}

export { registerForPushNotificationsAsync };
