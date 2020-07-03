import React from "react";
import { Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../UserContext.js";

import { WEB_URL } from "../config.js";

export default class CheckToken extends React.Component {
  static contextType = UserContext;
  componentDidMount = async () => {
    // Check if there is a token stored to skip logging in
    const token = await SecureStore.getItemAsync("refreshToken");
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
      console.log(responseJSON);
      if (responseJSON.active) {
        console.log("going to send");
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
    return <Text>Loading...</Text>;
  }
}
