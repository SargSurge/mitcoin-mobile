import React from "react";
import { Text, View } from "react-native";
import { UserContext } from "../UserContext.js";
import * as Notifications from "expo-notifications";
import Background from "./imageBackground.js";
import AnimatedLoader from "react-native-animated-loader";

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

    if ( await this.context.isSignedIn() ) {
      this.props.navigation.navigate("Send");
    } else {
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
