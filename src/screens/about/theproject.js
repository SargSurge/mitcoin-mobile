import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import Fonts from "../fonts.js";
import Background from "../imageBackground.js";

export default class TheProject extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <Background />
        <Text
          style={{ fontSize: 18, textAlign: "center", ...Fonts.regular_text }}
        >
          MITcoin is a charity project run by MIT MindHandHeart. It is our
          mission to empower charitable causes by rewarding good deeds performed
          around MIT's campus.
        </Text>
      </View>
    );
  }
}
