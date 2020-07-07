import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { UserContext } from "../UserContext.js";
import Header from "./header.js";
import Background from "./imageBackground.js";
import Fonts from "./fonts.js";
import { userSample } from "./send.js";
import VotedCharities from "./votedCharities.js";
import SelectedCharityView from "./selectedCharityView.js";
import * as SecureStore from "expo-secure-store";

sample_user = {
  mitid: 924392664,
  kerberos: "bntanga",
  giveBalance: 743,
  receiveBalance: 21,
  charity: "onTheRise",
  transactionHistory: [],
};

sample_user_modified = {
  mitid: 924392664,
  kerberos: "bntanga",
  giveBalance: 743,
  receiveBalance: 21,
  selectedCharity: "On The Rise",
  transactionHistory: [],

  fullName: "Brian Ntanga",
  distinct_people_given: 5,
  coinsGiven: 4,
  distinct_people_rec: 2,
};

export default class Profile extends React.Component {
  static contextType = UserContext;

  state = {};

  logout = async () => {
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("accessToken");
    this.props.navigation.navigate("Login");
  };

  render() {
    // console.log("this is user: ", this.context.user);

    const user = this.context.user;

    // const user = userSample;
    custom_num = (num) => (
      <Text
        style={{
          ...Fonts.regular_text,
          fontWeight: "500",
          fontSize: 18,
          color: "green",
        }}
      >
        {num}
      </Text>
    );

    border = (
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
              marginTop: 32,
              marginBottom: 24,
              ...Fonts.title,
              fontWeight: "400",
              color: "#982B39",
              fontSize: 24,
            }}
          >
            {" "}
            Signed in as {user.fullName}
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
            You have given {custom_num(user.amountGiven)} MITCoins to{" "}
            {custom_num(user.distinctSends.number)}{" "}
            {user.distinctSends.number === 1 ? "person" : "different people"}.
          </Text>

          <Text
            style={{
              alignSelf: "flex-start",
              marginBottom: 4,
              ...Fonts.regular_text,
              // fontWeight: "400",
              fontSize: 15,
              marginLeft: 16,
            }}
          >
            You have received {custom_num(user.receiveBalance)} MITCoins from{" "}
            {custom_num(user.distinctReceives.number)}{" "}
            {user.distinctReceives.number === 1 ? "person" : "different people"}
            .{/* change kerberos to actual ID */}
          </Text>

          {this.context.voting_closed ? (
            <SelectedCharityView
              selected_charity={user.selectedCharity}
              mitid={user.kerberos}
            />
          ) : (
            <VotedCharities
              charities={user.votedCharities}
              mitid={user.kerberos}
            />
          )}

          {border}

          <TouchableOpacity
            onPress={this.logout}
            style={{
              // borderRadius: 10,
              // borderColor: "red",
              // borderWidth: 1,
              padding: 10,
              elevation: 2,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: "#982B39",
                fontWeight: "600",
                textAlign: "center",
                ...Fonts.regular_text,
                fontSize: 16,
                borderRadius: 10,
                borderColor: "#982B39",
                borderWidth: 1,
                padding: 10,
                elevation: 2,
                marginLeft: 50,
                marginRight: 50,
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
