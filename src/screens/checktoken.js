import React from "react";
import { Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../UserContext.js";
import * as Notifications from "expo-notifications";
import Background from "./imageBackground.js";
import AnimatedLoader from "react-native-animated-loader";
import { WEB_URL } from "../config.js";

//See expo notifications documentation
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

    let token;
    try {
      token = await SecureStore.getItemAsync("refreshToken");
    } catch (error) {
      console.error(error);
      console.log("Error fetching item from secure store");
      this.props.navigation.navigate("Login");
      return;
    }

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

      let response, responseJSON;
      try {
        response = await fetch(WEB_URL + "auth/verify", options);
        responseJSON = await response.json();
      } catch (e) {
        console.error(e);
        console.log("cannot verify auth");
      }

      if (responseJSON.active) {
        this.context.updateUser(responseJSON.user);
        this.context.updateVotingStatus(responseJSON.is_voting_closed);
        this.props.navigation.navigate("Send");

        return;
      } else {
        this.props.navigation.navigate("Login");
        return;
      }
    } catch (err) {
      this.props.navigation.navigate("Login");
      return;
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
            color: "black",
          }}
        >
          Loading...
        </Text>
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("./3895-loader.json")}
          animationStyle={{ width: 200, height: 200, marginTop: 30 }}
          speed={1}
        />
      </View>
    );
  }
}
