import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Fonts from "./fonts.js";

CharityAndLink = ({ charity_name, charity_link }) => (
  <View style={{ width: "100%" }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 16,
        marginTop: 16,
        width: "100%",
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          ...Fonts.regular_text,
          fontSize: 16,
          fontWeight: "700",
          color: "#982B39",
          marginRight: 8,
          flex: 3.5,
        }}
      >
        {" "}
        {charity_name}{" "}
      </Text>
      <Text
        style={{
          fontSize: 14,
          textDecorationLine: "underline",
          paddingTop: 4,
          color: "blue",
          height: "100%",
          // textAlignVertical: "bottom",
          textAlign: "center",
          flex: 2,
        }}
      >
        Visit website
      </Text>
    </View>
    <View
      style={{ width: "100%", borderTopWidth: 1, borderColor: "#982B39" }}
    />
  </View>
);

export default VotedCharities = ({ charities }) => {
  let charityViews = charities.map((charity) => (
    <CharityAndLink
      charity_name={charity}
      charity_link={charity}
      key={charity}
    />
  ));
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
        The charities you voted for are:{" "}
      </Text>
      <View style={{ ...styles.card, marginBottom: 40 }}>
        {[...charityViews]}
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderColor: "green",
            borderWidth: 1,
            padding: 10,
            elevation: 2,
            backgroundColor: "#ffffff",
            width: "100%",
            marginTop: 16,
          }}
        >
          <Text
            style={{
              color: "green",
              fontWeight: "700",
              fontSize: 16,
              ...Fonts.regular_text,
              alignSelf: "center",
            }}
          >
            Vote for different charities
          </Text>
        </TouchableOpacity>
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
