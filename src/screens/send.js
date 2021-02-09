import React from "react";
import Toast, { DURATION } from "react-native-easy-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { Form, Item, Input, View, Button, Label, Text } from "native-base";
import API from "../api-client";

import {
  ScrollView,
  StyleSheet,
  FlatList,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";

import * as Linking from "expo-linking";

import { Formik } from "formik";
import * as yup from "yup";
import { UserContext } from "../UserContext.js";
import Header from "./header.js";

import Background from "./imageBackground.js";
import Fonts from "./fonts.js";
import { registerForPushNotificationsAsync } from "./notifications.js";

import CoinsIcon from "../../assets/images/CoinsIcon.png";

const DismissKeyboard = ({ children, dismissList }) => (
  //Component that dismisses the keyboard when it is active
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
      dismissList();
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
    <Text
      style={{
        ...Platform.select({
          ios: {
            flex: 4.5,
            fontWeight: "600",
            fontSize: 18,
          },
          android: {
            flex: 4.5,
            fontSize: 17,
            fontWeight: "bold",
            color: "#3B4049",
          },
        }),
        ...Fonts.header,
      }}
    >
      {text}:{" "}
    </Text>
    <Text style={{ ...Fonts.regular_text, flex: 4, fontSize: 16 }}>
      {value}
    </Text>
  </View>
);

export default class Send extends React.Component {
  static contextType = UserContext;

  state = {
    receiverKerberos: "",
    amount: "",
    comment: "",
    searchResults: [],
    showDropdown: false,
    displayName: "",
    modalVisible: true,
    sendingToName: "",
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .typeError("Amount must be a number")
        .min(1, "Invalid Amount!")
        .max(parseInt(this.context.user.balance), "Not enough coins")
        .required("Required!"),
      receiverKerberos: yup
        .string()
        .required("Required!")
        .test(
          "selfReceiver",
          "Cannot send coins to self",
          (kerb) => kerb !== this.context.user.kerberos
        ),
    }),
    showSpinner: false,
    //another hacky solution because kerb validation is done on backend
    kerbError: "",
  };

  dismissList = () => {
    //for removing the dropdown view
    this.setState({ showDropdown: false });
  };

  modal_function = () => {
    if (this.context.user.charity === "") {
      return this.modal();
    } else {
      return null;
    }
  };

  modal = () => {
    let intro_text = "Select a charity!";
    let explanation_text = `Hello ${this.context.user.name.given}! You have not yet voted for a charity. Please click on the button below to vote for a charity (or charities) of your choice on our website.`;
    let button_text = "Select a charity";

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
                {intro_text}
              </Text>
              <Text style={styles.modalText}>{explanation_text}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                    {button_text}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    padding: 10,
                    borderColor: "red",
                    borderWidth: 1,
                    elevation: 2,
                    backgroundColor: "#ffffff",
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
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  voteOnWebsite = async () => {
    var url = await this.context.createSignInURL();
    var returnUrl = Linking.makeUrl("/send");

    await Linking.openURL(`${url}?app_url=${returnUrl}`);

    this.setState({ modalVisible: false });
  };

  fetch_data = async (kerb_or_name) => {
    //Fetches peoples kerbs and names that match the given search string
    if (kerb_or_name === "") {
      return;
    }

    this.setState({ showSpinner: true });

    let response, responseJSON;
    try {
      response = await fetch(
        API.path("/people", { q: kerb_or_name }),
        {
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
        }
      );
      responseJSON = await response.json();
    } catch (e) {
      console.error(e);
      console.log("failed to fetch data from people api");
      this.setState({ showSpinner: false });
      return;
    }

    if (responseJSON.error) {
      this.setState({
        showSpinner: false,
      });

      return false;
    }

    this.setState({
      searchResults: responseJSON,
      showSpinner: false,
    });
  };

  handlePress = async (values, actions) => {
    //function called to submit coins
    this.setState({ showSpinner: true });

    var requestBody = {
      transfer_slip: {
        send_to_kerberos: values.receiverKerberos,
        amount: values.amount,
        description: values.comment
      }
    };

    var response = await fetch(
      API.path("/coin_transfers"),
      {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json", Authorization: `Bearer ${this.context.user.token}` },
        body: JSON.stringify(requestBody)
      }
    );

    if ( response.status === 201 ) {
      await this.context.refresh();
      await actions.setSubmitting(false);
      await actions.resetForm();

      //Hacky solution. The validation schema needs to be updated again with the new user send coins balance.
      //The old one still has old data hence the need for the new update. This code duplicates what is in this.state.validationSchema
      let newValidationSchema = yup.object().shape({
        amount: yup
          .number()
          .typeError("Amount must be a number")
          .min(1, "Invalid Amount!")
          .max(parseInt(this.context.user.balance), "Not enough coins")
          .required("Required!"),
        receiverKerberos: yup
          .string()
          .required("Required!")
          .test(
            "selfReceiver",
            "Cannot send coins to self",
            (kerb) => kerb !== this.context.user.kerberos
          ),
      });

      this.setState({
        validationSchema: newValidationSchema,
        showSpinner: false,
      });

      this.refs.toast.show("Coins sent successfully!", 2000);
    } else {
      //Checking if the kerb is invalid is done on the server. It returns a kerb
      //error if the kerb is invalid
      this.setState({ showSpinner: false, kerbError: "Invalid Kerberos" });
    }
  };

  componentDidMount() {
    registerForPushNotificationsAsync(this.context.user.kerberos);
  }

  render() {
    const user = this.context.user;

    let border = (
      <View
        style={{
          borderTopColor: "#8B333B",
          borderTopWidth: 1,
          width: "100%",
        }}
      ></View>
    );

    showToast = () => {
      this.refs.toast.show("Coins sent successfully!", 2000);
    };

    let custom_hash = (
      <Text style={{ color: "#238627", fontSize: 24 }}> # </Text>
    );

    return (
      <View>
        <View>
          <Toast
            ref="toast"
            style={{
              backgroundColor: "#238627",
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 16,
              paddingBottom: 16,
              borderWidth: 1,
              borderRadius: 16,

              borderColor: "#238627",
            }}
            textStyle={{
              ...Fonts.regular_text,
              color: "white",
              fontSize: 22,
              textAlign: "center",
              alignSelf: "center",
            }}
            position="top"
          />

          <Background />
          <Header navigation={this.props.navigation} title={"Send Coins"} />

          <ScrollView nestedScrollEnabled={true}>
            <DismissKeyboard dismissList={this.dismissList}>
              <View style={{ marginLeft: 8, marginRight: 8 }}>
                <View
                  style={{
                    alignItems: "center",
                    alignSelf: "stretch",
                  }}
                >
                  <Text
                    style={{
                      color: "#982B39",
                      paddingBottom: 16,

                      paddingTop: 20,
                      fontWeight: "500",
                      ...Fonts.header,
                      fontSize: 26,
                    }}
                  >
                    {" "}
                    Welcome {user.name.given}!
                  </Text>

                  {border}

                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        marginTop: 12,
                        marginBottom: 12,
                        marginLeft: 8,
                        flex: 2,
                      }}
                    >
                      <CoinDetails
                        text="Coins you can give"
                        value={`${user.balance} MITCoins`}
                      />

                      <CoinDetails
                        text="Coins you've received"
                        value={`${user.activity.coins_received} MITCoins`}
                      />
                    </View>
                    <Image
                      source={CoinsIcon}
                      style={{
                        height: 65,
                        width: 65,
                      }}
                    />
                  </View>
                </View>

                {border}

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

                <Spinner
                  visible={this.state.showSpinner}
                  size="large"
                  color="#982B39"
                />

                <Formik
                  initialValues={{
                    receiverKerberos: "",
                    amount: "",
                    comment: "",
                  }}
                  onSubmit={this.handlePress}
                  validationSchema={this.state.validationSchema}
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
                            paddingBottom: 4,
                            paddingTop: 4,
                          }}
                        >
                          {/* this.state.kerbError comes from server validation */}
                          <Label style={{ color: "red" }}>
                            {formikProps.errors.receiverKerberos &&
                            formikProps.touched.receiverKerberos
                              ? formikProps.errors.receiverKerberos
                              : this.state.kerbError}
                          </Label>
                          <Input
                            returnKeyType="done"
                            blurOnSubmit={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={formikProps.values.receiverKerberos}
                            placeholder="Search for receiver by name or kerb"
                            onChangeText={(text) => {
                              this.setState({
                                showDropdown: false,
                                kerbError: "",
                              });

                              let func = formikProps.handleChange(
                                "receiverKerberos"
                              );
                              func(text);
                            }}
                          />
                          <TouchableOpacity
                            style={{
                              borderWidth: 2,
                              flexDirection: "row",
                              alignItems: "center",
                              padding: 8,
                              borderRadius: 16,
                              borderColor: "#982B39",
                            }}
                            onPress={async () => {
                              if (formikProps.values.receiverKerberos === "") {
                                return;
                              }
                              await this.fetch_data(
                                formikProps.values.receiverKerberos
                              ).catch((error) => {
                                console.error(error);
                                console.log("error fetching data again");
                              });

                              this.setState({ showDropdown: true });
                            }}
                          >
                            <Text
                              style={{
                                ...Fonts.header,
                                color: "#982B39",
                                fontWeight: "bold",
                              }}
                            >
                              Search
                            </Text>
                          </TouchableOpacity>
                        </Item>
                        {this.state.showDropdown ? (
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

                            <FlatList
                              style={{
                                backgroundColor: "#FFF3F3",
                                borderWidth: 1,
                                borderColor: "black",
                                borderRadius: 8,
                                height: 450,
                                padding: 10,
                              }}
                              nestedScrollEnabled={true}
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
                                        item.kerberos;

                                      this.setState({
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

                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Text>{item.name}</Text>
                                      <Text style={{ fontWeight: "bold" }}>
                                        {item.kerberos}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                );
                              }}
                            />
                          </View>
                        ) : null}

                        <Item
                          style={{
                            borderColor: "red",
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            alignItems: "center",
                            paddingBottom: 8,
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
                            returnKeyType="done"
                            blurOnSubmit={true}
                          />
                        </Item>

                        <Item
                          style={{
                            borderColor: "red",
                            borderTopWidth: 1,
                            borderBottomWidth: 1,

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
                            returnKeyType="done"
                            blurOnSubmit={true}
                          />
                        </Item>
                      </View>

                      <Button
                        block
                        danger
                        onPress={() => {
                          formikProps.handleSubmit();
                        }}
                        style={{
                          backgroundColor: "#982B39",
                          marginBottom: 600,
                        }}
                      >
                        <Text style={{ fontWeight: "600" }}>Submit</Text>
                      </Button>
                    </Form>
                  )}
                </Formik>
              </View>
            </DismissKeyboard>
          </ScrollView>
          {this.modal_function()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SubmitButton: {
    paddingVertical: 6,
  },

  AppContainer: {
    padding: 8,
    marginTop: 80,
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
  },
  modalText: {
    marginBottom: 15,
  },
});
