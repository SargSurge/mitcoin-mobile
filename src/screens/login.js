import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { H2, Button, Text } from "native-base";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../UserContext.js";

import { CLIENT_ID, WEB_URL } from "../config.js";

import imgLogo from "../../assets/images/logo192x192.png";

const authurlstart =
  "https://oidc.mit.edu/authorize?response_type=code&redirect_uri=";

export default class Login extends React.Component {
  static contextType = UserContext;

  state = {
    result: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeViewStyle}>
          <Image style={styles.imgStyle} source={imgLogo} />
          <H2>MITcoin</H2>
        </View>
        <Button danger style={styles.buttonStyle} onPress={this.handlePress}>
          <Text>Login with Kerberos</Text>
        </Button>
      </View>
    );
  }

  handlePress = async () => {
    let redirectURL = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        authurlstart +
        encodeURIComponent(redirectURL) +
        "&client_id=" +
        CLIENT_ID,
    });
    let code = result.params.code;
    let response = await fetch(WEB_URL + "auth/get_token?code=" + code);
    let responseJSON = await response.json();

    if (responseJSON) {
      // console.log("response again", JSON.stringify(responseJSON.access_token));
      await SecureStore.setItemAsync(
        "accessToken",
        JSON.stringify(responseJSON.access_token)
      );
      // console.log("this is type if refresh token");
      // console.log(typeof responseJSON.refresh_token);
      await SecureStore.setItemAsync(
        "refreshToken",
        JSON.stringify(responseJSON.refresh_token)
      );
      await this.context.updateUser(responseJSON.user);
      await this.context.updateVotingStatus(responseJSON.is_voting_closed);

      this.props.navigation.navigate("Send");
    } else {
      console.log("ERRRRRRR");
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 14,
  },
  welcomeViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    height: 100,
    width: 100,
    margin: 14,
  },
  buttonStyle: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 5,
    margin: 14,
    height: 50,
    backgroundColor: "#982B39",
  },
});
