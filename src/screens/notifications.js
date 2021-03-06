import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, Platform, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import API from "../api-client";

//This component is not rendered. It is just used to test if notifications are working
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
    Notifications.addNotificationResponseReceivedListener((response) => {});
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

//function not used in app. Just used to test if notifications work
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

//this is used to register for notifications
//function copied from expo documentation. see: https://docs.expo.io/versions/latest/sdk/notifications/
//Made a few modifications to frequently ask for permissions
async function registerForPushNotificationsAsync(kerberos) {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    ).catch((error) => {
      console.log(error);
      return;
    });
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      ).catch((error) => {
        console.error(error);
        console.log("failed to ask for permission");
        return;
      });
      //in case permission is being asked for again
      finalStatus = status;
      if (status === "granted") {
        try {
          token = (await Notifications.getExpoPushTokenAsync()).data;
        } catch (e) {
          console.error(e);
          console.log("failed to ask expo for notification token");
        }

        request_and_set_new_expo_token(token, kerberos);
        return;
      }
    }
    if (finalStatus !== "granted") {
      return;
    }
    let tokenCheck;
    try {
      tokenCheck = await SecureStore.getItemAsync("notificationToken");
    } catch (e) {
      console.error(e);
      console.log("could not fetch secure store thing");
    }

    if (tokenCheck !== null) {
      // await SecureStore.deleteItemAsync("notificationToken");
      // tokenCheck = (await Notifications.getExpoPushTokenAsync()).data;
      request_and_set_new_expo_token(tokenCheck, kerberos);
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
      //   tokenCheck = (await Notifications.getExpoPushTokenAsync()).data;
      //   request_and_set_new_expo_token(tokenCheck, kerberos);
      return tokenCheck;
    }
    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } catch (e) {
      console.error(e);
      console.log("error asking for token");
      return;
    }
  } else {
    console.log("Must use physical device for Push Notifications");
    return;
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

//this function sends the newly retrieved expo token to the server.
async function request_and_set_new_expo_token(token, kerberos) {
  if ( token ) {
    var sessionData = await SecureStore.getItemAsync("session");
    var session = JSON.parse(sessionData);

    var response = await fetch(
      API.path("/profile/notification_tokens"),
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`
        },
        body: JSON.stringify({ _method: "PUT", token: token })
      }
    );

    if ( response.status !== 204 ) {
      await SecureStore.setItemAsync("notificationToken", token);
    }
  }
}

export { registerForPushNotificationsAsync };
