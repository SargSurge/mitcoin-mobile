import React from "react";
import { Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../UserContext.js";
import * as Notifications from "expo-notifications";
import Background from "./imageBackground.js";
import AnimatedLoader from "react-native-animated-loader";
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
    time1 = Date.now();
    let token;
    try {
      token = await SecureStore.getItemAsync("refreshToken");
    } catch (error) {
      console.error(error);
      console.log("Error fetching item from secure store");
      this.props.navigation.navigate("Login");
      return;
    }
    time2 = Date.now();
    console.log("this is time for secure store", time2 - time1);
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
      time3 = Date.now();
      //This is to prevent excessive loading
      // setTimeout(() => {
      //   console.log("timeout limit reached");
      //   this.props.navigation.navigate("Login");
      //   return;
      // }, 20000);
      let response = await fetch(WEB_URL + "auth/verify", options);
      let responseJSON = await response.json();
      // console.log("this is response: ", responseJSON);
      if (responseJSON.active) {
        this.context.updateUser(responseJSON.user);
        this.context.updateVotingStatus(responseJSON.is_voting_closed);
        this.props.navigation.navigate("Send");
        time4 = Date.now();
        console.log("this is time for API request", time4 - time3);
        return;
      } else {
        time4 = Date.now();
        console.log("this is time for API request", time4 - time3);
        this.props.navigation.navigate("Login");
        return;
      }
    } catch (err) {
      time4 = Date.now();
      console.log("this is time for API request", time4 - time3);
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

        {/* <Spinner color="red" /> */}
      </View>
    );
  }
}
