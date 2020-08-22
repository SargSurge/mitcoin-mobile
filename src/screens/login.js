import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../UserContext.js";
import Fonts from "./fonts.js";

import { CLIENT_ID, WEB_URL } from "../config.js";

import imgLogo from "../../assets/images/logo192x192.png";

const authurlstart =
  "https://oidc.mit.edu/authorize?response_type=code&redirect_uri=";

export default class Login extends React.Component {
  static contextType = UserContext;

  state = {
    result: null,
  };

  handlePress = async () => {
    //called to do the sign in process
    let redirectURL = AuthSession.getRedirectUrl();

    let result;
    try {
      //Login implemented using MITOpenID client
      result = await AuthSession.startAsync({
        authUrl:
          authurlstart +
          encodeURIComponent(redirectURL) +
          "&client_id=" +
          CLIENT_ID,
      });
    } catch (e) {
      console.error(e);
      console.log("cannot start auth session");
    }

    //code is what's used to fetch user data from backend
    let code = result.params.code;

    let response, responseJSON;
    try {
      response = await fetch(WEB_URL + "auth/get_token?code=" + code);
      //response.json() is an async function
      responseJSON = await response.json();
    } catch (e) {
      console.error(e);
      console.log("error fetching user");
    }

    if (responseJSON) {
      try {
        //Stored but never used in the app
        await SecureStore.setItemAsync(
          "accessToken",
          responseJSON.access_token
        );

        //Only the refresh token is being used for validation throughout the app. For some reason the
        // MIT OIDC server is not validating access tokens so that's that
        await SecureStore.setItemAsync(
          "refreshToken",
          responseJSON.refresh_token
        );
      } catch (e) {
        console.error(e);
        console.log("error uploading to secure store");
      }

      this.context.updateUser(responseJSON.user);
      this.context.updateVotingStatus(responseJSON.is_voting_closed);

      this.props.navigation.navigate("Send");
    } else {
      console.log("ERRRRRRR");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeViewStyle}>
          <Image style={styles.imgStyle} source={imgLogo} />
          <Text style={{ ...Fonts.header, fontWeight: "bold", fontSize: 24 }}>
            MITCoin
          </Text>
        </View>
        <Button danger style={styles.buttonStyle} onPress={this.handlePress}>
          <Text style={{ ...Fonts.header }}>Login with Kerberos</Text>
        </Button>
      </View>
    );
  }
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
