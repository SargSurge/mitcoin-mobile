import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Fonts from "./fonts.js";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import CharityIcon from "../../assets/images/CharityIcon.png";
import { UserContext } from "../UserContext";

export default class SelectedCharityView extends React.Component {
  static contextType = UserContext;

  visitWebsite = async () => {
    try {
      let result = await WebBrowser.openBrowserAsync(this.props.charity.url);
    } catch (e) {
      console.error(e);
      console.log("cannot visit website");
    }
  };

  selectCharityOnWebsite = async () => {
    var url = await this.context.createSignInURL();
    var returnUrl = Linking.makeUrl("/profile")

    await Linking.openURL(`${url}?app_url=${returnUrl}`);
  };

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
        onPress={this.selectCharityOnWebsite}
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
    return (
      <View
        style={{
          marginTop: 24,
          borderTopColor: "#982B39",
          borderTopWidth: 0.5,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Image source={CharityIcon} style={{ width: 80, height: 80 }} />
        </View>
        <Text
          style={{
            alignSelf: "center",
            ...Fonts.regular_text,

            marginTop: 8,
            fontSize: 18,
          }}
        >
          Your charity of choice is:
        </Text>

        <View style={{ ...styles.card, marginBottom: 40 }}>
          {this.props.charity === "" ? (
            <Text
              style={{
                alignSelf: "center",
                ...Fonts.regular_text,
                fontSize: 20,
                fontWeight: "400",
                color: "#982B39",
                width: "100%",
                textAlign: "center",
              }}
            >
              You have not selected any charity
            </Text>
          ) : (
            <Text
              style={{
                alignSelf: "center",
                ...Fonts.regular_text,
                fontSize: 20,
                fontWeight: this.props.charity === "" ? "300" : "600",
                color: "#982B39",
              }}
            >
              {this.props.charity.name}
            </Text>
          )}

          {this.props.charity === {}
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
