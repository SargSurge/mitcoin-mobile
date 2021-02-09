import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

import { UserContext } from "../UserContext.js";
import Header from "./header.js";
import Background from "./imageBackground.js";
import Fonts from "./fonts.js";

import SelectedCharityView from "./selectedCharityView.js";

export default class Profile extends React.Component {
  static contextType = UserContext;

  state = {};

  logout = async () => {
    await this.context.signOut();

    this.props.navigation.navigate("Login");
  };

  componentDidMount() {}

  render() {
    const user = this.context.user;

    let custom_num = (num) => (
      <Text
        style={{
          ...Fonts.regular_text,
          ...Platform.select({
            ios: {
              fontWeight: "500",
              fontSize: 18,
            },
            android: {
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: 16,
            },
          }),

          color: "#982B39",
        }}
      >
        {num}
      </Text>
    );

    let border = (
      <View
        style={{
          borderTopColor: "#982B39",
          borderTopWidth: 0.5,
        }}
      ></View>
    );
    return (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Background />
        <Header navigation={this.props.navigation} title="Profile" />

        <ScrollView>
          <Text
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginTop: 32,
              marginBottom: 24,
              ...Fonts.title,
              fontWeight: "400",
              color: "#982B39",
              fontSize: 24,
              paddingLeft: 4,
              paddingRight: 4,
            }}
          >
            {" "}
            Signed in as {user.name.given}
          </Text>

          {border}
          <Text
            style={{
              alignSelf: "flex-start",
              marginBottom: 8,
              ...Fonts.regular_text,
              fontWeight: "400",
              fontSize: 15,
              marginTop: 24,
              marginLeft: 16,
            }}
          >
            You have given {custom_num(user.activity.coins_sent)} MITCoins to{" "}
            {custom_num(user.activity.recipient_count)}{" "}
            {user.activity.recipient_count === 1 ? "person" : "different people"}.
          </Text>

          <Text
            style={{
              alignSelf: "flex-start",
              marginBottom: 4,
              ...Fonts.regular_text,

              fontSize: 15,
              marginLeft: 16,
            }}
          >
            You have received {custom_num(user.activity.coins_received)} MITCoins from{" "}
            {custom_num(user.activity.benefactor_count)}{" "}
            {user.activity.benefactor_count === 1 ? "person" : "different people"}
            .
          </Text>

          <SelectedCharityView charity={user.charity} />

          {border}

          <TouchableOpacity
            onPress={() => setTimeout(this.logout, 200)}
            style={{
              elevation: 2,
              marginTop: 30,
              marginBottom: 60,
              backgroundColor: "#ffffff",

              marginLeft: 50,
              marginRight: 50,
              borderColor: "#982B39",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text
              style={{
                backgroundColor: "#ffffff",
                color: "#982B39",
                fontWeight: "600",
                textAlign: "center",
                ...Fonts.regular_text,
                fontSize: 16,
              }}
            >
              Sign out
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
