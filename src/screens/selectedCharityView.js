import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Fonts from "./fonts.js";
import * as WebBrowser from "expo-web-browser";
import { WEB_URL } from "../config.js";
import * as Linking from "expo-linking";
import io from "socket.io-client";

export default class SelectedCharityView extends React.Component {
  state = { charity_name: "", charity_link: "" };

  fetch_links = async () => {
    let body = JSON.stringify({
      charities: [this.props.selected_charity],
    });
    console.log("these are charities", this.props.selected_charity);
    let response = await fetch(WEB_URL + "api/get_charity_links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    let responseJSON = await response.json();
    console.log("this is response", responseJSON);
    this.setState({
      charity_name: responseJSON[0].charity,
      charity_link: responseJSON[0].link,
    });
  };
  visitWebsite = async () => {
    let result = await WebBrowser.openBrowserAsync(this.state.charity_link);
  };
  selectCharityOnWebsite = async () => {
    let result = await Linking.openURL(
      WEB_URL + "selectcharity/" + this.props.mitid
    );
    //rerendering to refresh results
    // this is not working, find other solution
    this.setState({});
  };
  componentDidMount() {
    const socket = io(WEB_URL);
    if (this.props.selected_charity !== "") {
      !this.fetch_links();
    }
  }

  no_charity_present_button = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
        width: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: 10,
          borderColor: "#9CD6B0",
          borderWidth: 2,
          padding: 10,
          elevation: 2,
          backgroundColor: "#ffffff",
          alignSelf: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "green",
            fontWeight: "600",
            fontSize: 18,
            ...Fonts.regular_text,
          }}
        >
          Select a charity
        </Text>
      </TouchableOpacity>
    </View>
  );
  charity_present_view = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
      }}
    >
      <TouchableOpacity
        onPress={this.selectCharityOnWebsite}
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
        onPress={this.visitWebsite}
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
  );
  render() {
    console.log("i am invoked");
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
          {/* {this.props.selected_charity === ""
            ? null
            : "The charity you selected is: "} */}
          Your charity of choice is:
        </Text>
        <View style={{ ...styles.card, marginBottom: 40 }}>
          <Text
            style={{
              alignSelf: "center",
              ...Fonts.regular_text,
              fontSize: 20,
              fontWeight: this.props.selected_charity === "" ? "300" : "600",
              color: "#982B39",
            }}
          >
            {this.props.selected_charity === ""
              ? "You have not selected any charity"
              : this.state.charity_name}
          </Text>
          {this.props.selected_charity === ""
            ? this.no_charity_present_button
            : this.charity_present_view}
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
