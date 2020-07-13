import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Fonts from "./fonts.js";
import { WEB_URL } from "../config.js";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

NoCharitySelectedView = () => (
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
        }}
      >
        You have not voted for any charity
      </Text>
    </View>
    <View
      style={{ width: "100%", borderTopWidth: 1, borderColor: "#982B39" }}
    />
  </View>
);
CharityAndLink = ({ charity_name, charity_link }) => {
  visitWebsite = async () => {
    let result = await WebBrowser.openBrowserAsync(charity_link);
  };
  return (
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
          onPress={() => visitWebsite()}
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
};

export default class VotedCharities extends React.Component {
  state = { charities_with_links: [] };

  fetch_links = async () => {
    let body = JSON.stringify({
      charities: this.props.charities,
    });
    console.log("these are charities", this.props.charities);
    let response = await fetch(WEB_URL + "api/get_charity_links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    let responseJSON = await response.json();
    console.log("this is response", responseJSON);
    this.setState({ charities_with_links: responseJSON });
  };

  voteOnWebsite = async () => {
    // let result = await WebBrowser.openBrowserAsync(
    //   WEB_URL + "votecharity/" + this.props.mitid
    // );
    Linking.openURL(
      WEB_URL + "votecharity/" + this.props.mitid + "/" + this.props.socketid
    );
    //rerendering to refresh results
    // this is not working, find other solution
    this.setState({});
  };
  componentDidMount() {
    this.fetch_links();
  }
  render() {
    let charityViews = this.state.charities_with_links.map((charity, index) => (
      <CharityAndLink
        charity_name={charity.charity}
        charity_link={charity.link}
        key={index}
      />
    ));

    intro_text = () => {
      console.log("this is length " + charityViews.length);
      switch (this.state.charities_with_links) {
        case 0:
          return null;
        case 1:
          return "The charity you voted for is: ";
        default:
          return "The charities you voted for are: ";
      }
    };
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
            ...Fonts.regular_text,
            //   fontWeight: "500",
            marginTop: 24,
            fontSize: 18,
          }}
        >
          {intro_text()}
        </Text>
        <View style={{ ...styles.card, marginBottom: 40 }}>
          {charityViews.length === 0
            ? NoCharitySelectedView()
            : [...charityViews]}
          <TouchableOpacity
            onPress={() => this.voteOnWebsite()}
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
              {charityViews.length === 0
                ? "Vote for your favourite charities"
                : "Vote for different charities"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  card: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    borderColor: "#9CD6B0",
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
