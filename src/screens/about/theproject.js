import React from "react";
import { View, Image } from "react-native";
import { Text } from "native-base";
import Fonts from "../fonts.js";
import Background from "../imageBackground.js";
import AboutLogo from "../../../assets/images/AboutLogo.png";

export default class TheProject extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 30,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Background />
        <Text
          style={{ fontSize: 17, textAlign: "center", ...Fonts.regular_text }}
        >
          MITCoin is a charity project run by MIT MindHandHeart. It is our
          mission to empower charitable causes by rewarding good deeds performed
          around MIT's campus.
        </Text>

        <Image source={AboutLogo} style={{ width: 300, height: 300 }} />
      </View>
    );
  }
}
