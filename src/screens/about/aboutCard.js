import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Fonts from "../fonts.js";

export default AboutCard = ({ title, body }) => {
  return (
    <View style={{ ...styles.card }}>
      <Text
        style={{
          fontSize: 24,
          ...Fonts.header,
          paddingBottom: 4,
        }}
      >
        {title}
      </Text>
      <View style={{ ...Fonts.regular_text }}>{body}</View>
    </View>
  );
};

let styles = StyleSheet.create({
  card: {
    marginTop: 8,
    marginLeft: 2,
    marginRight: 2,
    padding: 24,

    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    borderColor: "#43C2A4",
    borderWidth: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
