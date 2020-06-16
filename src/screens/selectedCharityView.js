import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Fonts from "./fonts.js";

export default SelectedCharityView = ({ selectedCharity }) => {
  return (
    <View
      style={{
        marginTop: 24,
        borderTopColor: "#982B39",
        borderTopWidth: 0.5,
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          ...Fonts.title,
          //   fontWeight: "500",
          marginTop: 24,
          fontSize: 18,
        }}
      >
        {" "}
        The charity you selected is:{" "}
      </Text>
      <View style={{ ...styles.card, marginBottom: 40 }}>
        <Text
          style={{
            alignSelf: "center",
            ...Fonts.regular_text,
            fontSize: 20,
            fontWeight: "700",
            color: "#982B39",
          }}
        >
          {" "}
          {selectedCharity}{" "}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderColor: "#9CD6B0",
              borderWidth: 1,
              padding: 10,
              elevation: 2,
              backgroundColor: "#ffffff",
            }}
          >
            <Text
              style={{
                color: "green",
                fontWeight: "400",
                fontSize: 16,
                ...Fonts.regular_text,
              }}
            >
              Change charity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderColor: "#9CD6B0",
              borderWidth: 1,
              padding: 10,
              elevation: 2,
              backgroundColor: "#ffffff",
            }}
          >
            <Text
              style={{
                color: "green",
                fontWeight: "400",
                fontSize: 16,
                ...Fonts.regular_text,
              }}
            >
              Visit website
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  card: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    borderColor: "#2646EC",
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
