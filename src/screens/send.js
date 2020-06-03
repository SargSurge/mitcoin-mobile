import React from "react";
import {
  Header,
  Container,
  Content,
  Form,
  Item,
  Input,
  View,
  H1,
  Button,
  Text,
  Spinner,
  Label,
  Body,
  Title,
  Right,
  ListItem,
} from "native-base";
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Platform,
  Image,
  ImageBackground,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { Dropdown } from "react-native-material-dropdown";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesome5 } from "@expo/vector-icons";
// import GiveMoney from "../../assets/images/giveMoney.svg";

import { Formik } from "formik";
import * as yup from "yup";
import { UserContext } from "../UserContext.js";
import { WEB_URL } from "../config.js";
import * as WebBrowser from "expo-web-browser";
import Bar from "./bar.js";
import imgLogo from "../../assets/images/logo192x192.png";

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
//For ease when working
sample_user = {
  mitid: 123456,
  kerberos: "bntanga",
  giveBalance: 743,
  receiveBalance: 21,
  charity: "onTheRise",
  transactionHistory: [],
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
  };

  componentDidMount() {
    //change this to user obj
    this.get_user_name(sample_user.kerberos);
  }

  get_user_name = async (kerb) => {
    //this function gets name from kerb id of user
    let response = await fetch(
      `${WEB_URL}api/find_user_by_kerb_or_name?kerb_or_name=${kerb}`
    );
    let responseJSON = await response.json();
    let userobj = responseJSON.users[0];
    let first_name = userobj.name.split(" ")[0];
    this.setState({ displayName: first_name });
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
    // const user = this.context.user;
    const user = sample_user;
    let custom_hash = (
      <Text style={{ color: "#238627", fontSize: 24 }}> # </Text>
    );
    return (
      <DismissKeyboard>
        <Container>
          <ImageBackground
            source={imgLogo}
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              opacity: 0.026,
            }}
          ></ImageBackground>
          <Header>
            <Bar navigation={this.props.navigation} />
            <Body style={{ flex: 1 }}>
              <Title>Send Coins</Title>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
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
                  ...Platform.select({
                    ios: {
                      fontFamily: "Georgia-Italic",
                    },
                    android: {
                      fontFamily: "notoserif",
                    },
                  }),
                }}
              >
                {" "}
                Welcome {this.state.displayName}!
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  ...Platform.select({
                    ios: {
                      fontFamily: "Georgia",
                    },
                    android: {
                      fontFamily: "notoserif",
                    },
                  }),
                }}
              >
                <FontAwesomeIcon
                  icon={faHandHoldingUsd}
                  color="#982B39"
                  size={24}
                />
                <Text
                  style={{
                    paddingBottom: 4,
                    paddingTop: 4,
                    marginTop: 0,
                  }}
                >
                  {"  Coins to give: " + user.giveBalance + " MITcoins "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 8,
                  paddingTop: 4,
                }}
              >
                <FontAwesome5 name="donate" size={24} color="#982B39" />
                <Text style={{ paddingBottom: 4, paddingTop: 4 }}>
                  {"   Coins received: " + user.receiveBalance + " MITcoins"}
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  borderBottomColor: "black",
                  borderBottomWidth: 0.5,
                }}
              />
              <Text>{"\n"}</Text>
            </View>

            <KeyboardAvoidingView behavior="padding" enabled>
              <Text
                style={{
                  fontSize: 28,

                  textAlign: "center",
                  marginBottom: 16,
                  ...Platform.select({
                    ios: {
                      fontFamily: "AvenirNextCondensed-Medium",
                    },
                    android: {
                      fontFamily: "monospace",
                    },
                  }),
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
                        <Text>Submit</Text>
                      </Button>
                    )}
                  </Form>
                )}
              </Formik>
            </KeyboardAvoidingView>
            {/* </ScrollView> */}
          </View>
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
});
