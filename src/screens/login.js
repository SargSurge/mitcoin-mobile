import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import { UserContext } from "../UserContext.js";
import Fonts from "./fonts.js";
import API from "../api-client";

import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import imgLogo from "../../assets/images/logo192x192.png";

export default class Login extends React.Component {
  static contextType = UserContext;

  handlePress = async () => {
    var loginUrl = API.path("/touchstone/authenticate", { app_url: Linking.makeUrl("/") });
    let result = await WebBrowser.openAuthSessionAsync(loginUrl);
    let redirectData;

    if ( result.url ) {
      redirectData = Linking.parse(result.url);

      if ( redirectData.queryParams.token ) {
        await this.context.signIn(redirectData.queryParams.token);

        this.props.navigation.navigate("Send");
      } else {
        alert("Unable to sign in");
      }
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
