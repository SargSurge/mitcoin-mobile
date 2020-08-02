import React from "react";
import { Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../UserContext.js";
import * as Notifications from "expo-notifications";
import Background from "./imageBackground.js";

import { WEB_URL } from "../config.js";
import { Spinner } from "native-base";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default class CheckToken extends React.Component {
  static contextType = UserContext;
  componentDidMount = async () => {
    // Check if there is a token stored to skip logging in
    const token = await SecureStore.getItemAsync("refreshToken");
    console.log("token from secure store", token);
    // console.log("this is type of secure store token");
    // console.log(typeof token);
    if (!token) {
      this.props.navigation.navigate("Login");
      return;
    }
    // Check if the token is still valid
    try {
      let options = {
        headers: {
          Authorization: token,
        },
      };
      let response = await fetch(WEB_URL + "auth/verify", options);
      let responseJSON = await response.json();
      if (responseJSON.active) {
        await this.context.updateUser(responseJSON.user);
        await this.context.updateVotingStatus(responseJSON.is_voting_closed);
        this.props.navigation.navigate("Send");
        return;
      } else {
        this.props.navigation.navigate("Login");
      }
    } catch (err) {
      this.props.navigation.navigate("Login");
    }
  };

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Background />
        <Text
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: 24,
            marginBottom: 14,
          }}
        >
          Loading...
        </Text>
        <Spinner color="red" />
      </View>
    );
  }
}
