import React from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  View,
  H1,
  Button,
  Spinner,
  Label,
  Text,
} from "native-base";
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Platform,
  Image,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

import * as Linking from "expo-linking";
import { Dropdown } from "react-native-material-dropdown";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// import GiveMoney from "../../assets/images/giveMoney.svg";

import { Formik } from "formik";
import * as yup from "yup";
import { UserContext } from "../UserContext.js";
import Header from "./header.js";
import { WEB_URL } from "../config.js";
import * as WebBrowser from "expo-web-browser";
import Background from "./imageBackground.js";
import Fonts from "./fonts.js";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
      console.log("dismiss pressed");
    }}
    styles={{
      width: "100%",
      height: "100%",
    }}
  >
    {children}
  </TouchableWithoutFeedback>
);
const CoinDetails = ({ text, value }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 4,
    }}
  >
    <Text style={{ flex: 3, ...Fonts.header, fontWeight: "600", fontSize: 18 }}>
      {text}:{" "}
    </Text>
    <Text style={{ ...Fonts.regular_text, flex: 4, fontSize: 16 }}>
      {value}
    </Text>
  </View>
);
//For ease when working
sample_user1 = {
  mitid: 924392664,
  kerberos: "bntanga",
  giveBalance: 743,
  receiveBalance: 21,
  charity: "onTheRise",
  fullName: "Brian Ntanga",
  transactionHistory: [],
};

export const userSample = {
  fullName: "Brian Ntanga",
  mitid: 6667788,
  kerberos: "bntanga",
  giveBalance: 5000,
  amountGiven: 20,
  receiveBalance: 50,
  votedCharities: [
    "My very long name charity Which is going to overflow",
    "Africa music",
    "Another charity",
  ],
  selectedCharity: "On the Rise",
  distinctSends: { kerbs: ["bntanga"], number: 4 },
  distinctReceives: { kerbs: ["ifyt"], number: 6 },
  sendHistory: [],
  receiveHistory: [
    {
      date: 66060505070708808008909090909090900990,
      amount: 10,
      tofrom: "bouth",
      comment: "Because i WANT",
      name: "Bint Outhman",
    },
  ],
};

export default class Send extends React.Component {
  static contextType = UserContext;

  state = {
    receiverKerberos: "",
    amount: "",
    comment: "",
    searchResults: [],
    //this value doesnt do anything but leaving it just in case
    rerender: true,
    showDropdown: false,
    displayName: "",
    modalVisible: true,
    sendingToName: "",
  };

  modal = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",

                  textAlign: "center",
                  marginBottom: 16,
                  ...Fonts.header,
                }}
              >
                Vote for a charity!{" "}
              </Text>
              <Text style={styles.modalText}>
                Hello {this.state.displayName}! You have not yet voted for a
                charity. Please click on the button below to vote for a charity
                of your choice on our website.{" "}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableHighlight
                  style={{
                    borderRadius: 10,
                    borderColor: "#9CD6B0",
                    borderWidth: 1,
                    padding: 10,
                    elevation: 2,
                    backgroundColor: "#ffffff",
                  }}
                  onPress={() => {
                    this.voteOnWebsite();
                  }}
                >
                  <Text
                    style={{
                      color: "green",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    Vote for charity{" "}
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                  }}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                >
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    Close{" "}
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  voteOnWebsite = async () => {
    // let result = await WebBrowser.openBrowserAsync(
    //   WEB_URL + "votecharity/" + sample_user.mitid
    // );
    Linking.openURL(WEB_URL + "votecharity/" + sample_user.mitid);
    this.setState({ modalVisible: false });
  };

  fetch_data = async (kerb_or_name) => {
    //Too little data to search through
    console.log("func invoked with " + kerb_or_name);
    let response = await fetch(
      `${WEB_URL}api/find_user_by_kerb_or_name?kerb_or_name=${kerb_or_name}`
    );
    let responseJSON = await response.json();

    this.setState({
      searchResults: responseJSON.users,
      rerender: false,
      showDropdown: true,
    });
  };

  handlePress = async (values, actions) => {
    let body = JSON.stringify({
      giverKerberos: this.context.user.kerberos,
      receiverKerberos: values.receiverKerberos,
      amount: values.amount,
      comment: values.comment,
      name: this.state.sendingToName,
    });

    let response = await fetch(WEB_URL + "api/idsend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    let responseJSON = await response.json();
    console.log("this is a new transaction", responseJSON);
    this.context.updateUser(responseJSON);
    await actions.setSubmitting(false);
    await actions.resetForm();
  };

  validationSchema = yup.object().shape({
    receiverKerberos: yup
      .string()
      .required("Required!")
      .test(
        "validkerbmatch",
        "Cannot send to self",
        (value) => value !== this.context.user.kerberos
      ),
    amount: yup
      .number()
      .min(1, "Invalid Amount!")
      .max(parseInt(this.context.user.giveBalance), "Invalid Amount!")
      .required("Required!"),
  });

  render() {
    const user = this.context.user;
    // const user = userSample;

    let border = (
      <View
        style={{
          borderTopColor: "#982B39",
          borderTopWidth: 0.5,
          width: "100%",
        }}
      ></View>
    );

    let custom_hash = (
      <Text style={{ color: "#238627", fontSize: 24 }}> # </Text>
    );

    return (
      <DismissKeyboard>
        <Container>
          <Background />
          <Header navigation={this.props.navigation} title={"Send Coins"} />

          <View style={styles.AppContainer}>
            <View
              style={{
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <Text
                style={{
                  color: "#982B39",
                  paddingBottom: 4,
                  marginBottom: 8,
                  paddingTop: 4,
                  fontWeight: "500",
                  ...Fonts.header,
                  fontSize: 26,
                }}
              >
                {" "}
                Welcome {user.fullName.split(" ")[0]}!
              </Text>

              {border}
              <View
                style={{
                  width: "100%",
                  marginTop: 24,
                  marginBottom: 24,
                  marginLeft: 16,
                }}
              >
                <CoinDetails
                  text="Coins you can give"
                  value={`${user.giveBalance} MITCoins`}
                />

                <CoinDetails
                  text="Coins you've received"
                  value={`${user.receiveBalance} MITCoins`}
                />
              </View>
            </View>
            {border}

            <KeyboardAvoidingView behavior="padding" enabled>
              <Text
                style={{
                  fontSize: 28,
                  padding: 16,

                  textAlign: "center",
                  ...Fonts.header,
                }}
              >
                {custom_hash}
                Send Coins
                {custom_hash}
              </Text>
              <Formik
                initialValues={{
                  receiverKerberos: "",
                  amount: "",
                  comment: "",
                }}
                onSubmit={this.handlePress}
                validationSchema={this.validationSchema}
              >
                {(formikProps) => (
                  <Form>
                    <View>
                      <Item
                        style={{
                          alignSelf: "stretch",
                          borderColor: "red",
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          alignItems: "center",
                          paddingBottom: 20,
                        }}
                        stackedLabel
                      >
                        <Label style={{ color: "red" }}>
                          {formikProps.errors.receiverKerberos &&
                          formikProps.touched.receiverKerberos
                            ? formikProps.errors.receiverKerberos
                            : null}
                        </Label>
                        <Input
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={formikProps.values.receiverKerberos}
                          placeholder="Search for receiver by name or kerberos ID"
                          onChangeText={(text) => {
                            // formikProps.values.receiverKerberos = text;
                            if (text.length > 2) {
                              this.fetch_data(text);
                            } else {
                              this.setState({ showDropdown: false });
                            }
                            let func = formikProps.handleChange(
                              "receiverKerberos"
                            );
                            func(text);
                          }}
                        />
                      </Item>
                      {this.state.showDropdown ? (
                        // <Item style={{ width: "100%" }}>
                        <View style={{ width: "100%", height: "100%" }}>
                          <Text
                            style={{
                              paddingTop: 8,
                              height: 32,
                              opacity: 1,
                              alignSelf: "center",
                              color: "#982B39",
                              textAlign: "center",
                              fontWeight: "800",
                            }}
                          >
                            {this.state.searchResults.length > 0
                              ? "Double tap to select user"
                              : "No results to show"}
                          </Text>
                          <ScrollView style={{ padding: 10 }}>
                            <FlatList
                              style={{
                                backgroundColor: "#FFF3F3",
                                borderWidth: 1,
                                borderColor: "black",
                                borderRadius: 8,
                                height: 450,
                              }}
                              data={this.state.searchResults}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({ item }) => {
                                return (
                                  <TouchableOpacity
                                    style={{
                                      marginTop: 1,
                                      marginBottom: 1,
                                      borderTopWidth: 0.5,
                                      borderColor: "black",
                                      borderBottomWidth: 0.5,
                                      height: 80,
                                      paddingLeft: 8,
                                      paddingRight: 8,
                                    }}
                                    onPress={() => {
                                      formikProps.values.receiverKerberos =
                                        item.kerb;

                                      //this is to reload the input value withoout making another network request
                                      this.setState({
                                        rerender: false,
                                        showDropdown: false,
                                        sendingToName: item.name,
                                      });
                                    }}
                                  >
                                    <View
                                      scrollEnabled={false}
                                      style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Text>{item.name}</Text>
                                      <Text style={{ fontWeight: "bold" }}>
                                        {item.kerb}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                );
                              }}
                            />
                          </ScrollView>
                        </View>
                      ) : // </Item>
                      null}

                      <Item
                        stackedLabel
                        style={{
                          alignSelf: "stretch",
                          borderColor: "red",
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          alignItems: "center",
                          paddingBottom: 16,
                          marginTop: 1,
                        }}
                      >
                        <Label style={{ color: "red" }}>
                          {formikProps.errors.amount &&
                          formikProps.touched.amount
                            ? formikProps.errors.amount
                            : null}
                        </Label>
                        <Input
                          value={formikProps.values.amount}
                          placeholder="Amount"
                          onChangeText={formikProps.handleChange("amount")}
                        />
                      </Item>

                      <Item
                        style={{
                          borderColor: "red",
                          borderTopWidth: 1,
                          borderBottomWidth: 1,

                          // paddingBottom: 20,
                          paddingTop: 8,
                          marginBottom: 8,
                          marginTop: 1,
                        }}
                        stackedLabel
                      >
                        <Input
                          value={formikProps.values.comment}
                          placeholder="Reason Why (Optional)"
                          multiline={true}
                          numberOfLines={3}
                          onChangeText={formikProps.handleChange("comment")}
                        />
                      </Item>
                    </View>
                    {formikProps.isSubmitting ? (
                      <Spinner />
                    ) : (
                      <Button block danger onPress={formikProps.handleSubmit}>
                        <Text style={{ fontWeight: "600" }}>Submit</Text>
                      </Button>
                    )}
                  </Form>
                )}
              </Formik>
            </KeyboardAvoidingView>
            {/* </ScrollView> */}
          </View>
          {this.modal()}
        </Container>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  SubmitButton: {
    paddingVertical: 6,
  },

  AppContainer: {
    padding: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
