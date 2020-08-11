import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Fonts from "./fonts.js";
import * as WebBrowser from "expo-web-browser";
import { WEB_URL } from "../config.js";
import * as Linking from "expo-linking";

export default class SelectedCharityView extends React.Component {
  state = { charity_name: "", charity_link: "" };

  fetch_links = async () => {
    let body = JSON.stringify({
      charities: [this.props.selected_charity],
    });
    let response;
    try{response = await fetch(WEB_URL + "api/get_charity_links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
    });}
    catch(error){
        console.error(error)
        console.log("error fetching links")
        return

    }
    let responseJSON;
    try{
        responseJSON = await response.json();

    }
    catch(error){
        console.error(error)
        console.log("failed to convert to json")
        return
    }


    this.setState({
      charity_name: responseJSON[0].charity,
      charity_link: responseJSON[0].link,
    });
  };
  visitWebsite = async () => {
      try{  let result = await WebBrowser.openBrowserAsync(this.state.charity_link);}
      catch (e) {
          console.error(e)
          console.log("cannot visit website")
      }

  };
  selectCharityOnWebsite = async () => {
      try{result = await Linking.openURL(
          WEB_URL + "selectcharity/" + this.props.mitid
      );}
      catch (e) {
          console.error(e)
          console.log("cannot visit website")
      }

    //rerendering to refresh results
    // this is not working, find other solution
    this.setState({});
  };

  componentDidMount() {
    if (this.props.selected_charity !== "") {
      this.fetch_links();
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.selected_charity !== prevProps.selected_charity) {
      this.fetch_links();
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
        <Text
          style={{
            alignSelf: "center",
            ...Fonts.regular_text,
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
          {this.props.selected_charity === "" ? (
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
                fontWeight: this.props.selected_charity === "" ? "300" : "600",
                color: "#982B39",
              }}
            >
              {this.state.charity_name}
            </Text>
          )}

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
