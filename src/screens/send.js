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
  Image,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
// import GiveMoney from "../../assets/images/giveMoney.svg";

import { Formik } from "formik";
import * as yup from "yup";
import { UserContext } from "../UserContext.js";
import { WEB_URL } from "../config.js";
import * as WebBrowser from "expo-web-browser";
import Bar from "./bar.js";

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
    rerender: true,
  };

  fetch_data = async (kerb_or_name) => {
    //Too little data to search through
    console.log("func invoked with " + kerb_or_name);
    let response = await fetch(
      `${WEB_URL}api/find_user_by_kerb_or_name?kerb_or_name=${kerb_or_name}`
    );
    let responseJSON = await response.json();
    console.log("this is response", responseJSON);
    this.setState({ searchResults: responseJSON.users, rerender: false });
  };
  onSearchUsersPress = (kerb_or_name, props) => {
    console.log("func called with " + kerb_or_name);
    if (kerb_or_name.length > 2 && this.state.rerender) {
      this.fetch_data(kerb_or_name);
      return props.handleChange("receiverKerberos");
    }
    //this is to avoid an infinite loop caused by rerenders
    this.state.rerender = true;
    return props.handleChange("receiverKerberos");
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
    return (
      <Container>
        <Header>
          <Bar navigation={this.props.navigation} />
          <Body style={{ flex: 1 }}>
            <Title>Send Coins</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content style={styles.AppContainer}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ paddingBottom: 4, paddingTop: 4 }}>
              {" "}
              Welcome {user.kerberos}!
            </Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesomeIcon
                icon={faHandHoldingUsd}
                color="#982B39"
                size={24}
              />
              <Text style={{ paddingBottom: 4, paddingTop: 4, marginTop: 0 }}>
                {"   You have " + user.giveBalance + " MITcoins to give."}
              </Text>
            </View>

            <Text style={{ paddingBottom: 4, paddingTop: 4 }}>
              {"You have received " + user.receiveBalance + " MITcoins."}
            </Text>

            <View
              style={{
                width: "100%",
                borderBottomColor: "black",
                borderBottomWidth: 0.5,
              }}
            />
            <Text>{"\n"}</Text>
          </View>
          <ScrollView>
            <KeyboardAvoidingView behavior="padding" enabled>
              <H1 style={{ textAlign: "center" }}>Send Coins</H1>
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
                      <Item style={{ alignSelf: "stretch" }} stackedLabel>
                        <Text>
                          {" "}
                          Search for receiver by Kerberos or last name{" "}
                        </Text>
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
                          placeholder="Receiver's kerberos"
                          onChangeText={this.onSearchUsersPress(
                            formikProps.values.receiverKerberos,
                            formikProps
                          )}
                        />
                      </Item>
                      <Item>
                        <ScrollView>
                          <FlatList
                            data={this.state.searchResults}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                              return (
                                <ListItem
                                  onPress={() => {
                                    formikProps.values.receiverKerberos =
                                      item.kerb;
                                    console.log(
                                      "new value ",
                                      formikProps.values.receiverKerberos
                                    );
                                    //this is to reload the input value withoout making another network request
                                    this.setState({ rerender: false });
                                  }}
                                >
                                  <View
                                    style={{
                                      flex: 1,
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Text>{item.name}</Text>
                                    <Text>{item.kerb}</Text>
                                  </View>
                                </ListItem>
                              );
                            }}
                          />
                        </ScrollView>
                      </Item>
                      <Item stackedLabel>
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
                    </View>
                    <Item regular style={{ paddingTop: 8 }}>
                      <Input
                        value={formikProps.values.comment}
                        placeholder="Reason Why (Optional)"
                        multiline={true}
                        numberOfLines={3}
                        style={{ height: 100 }}
                        onChangeText={formikProps.handleChange("comment")}
                      />
                    </Item>
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
          </ScrollView>
        </Content>
      </Container>
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
