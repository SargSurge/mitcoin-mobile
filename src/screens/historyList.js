import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Content } from "native-base";
import moment from "moment";
import Fonts from "./fonts.js";

SingleField = ({ text, value }) => (
  <View
    style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}
  >
    <Text
      style={{ flex: 1.5, ...Fonts.header, fontWeight: "600", fontSize: 15 }}
    >
      {text}:{" "}
    </Text>
    <Text style={{ ...Fonts.regular_text, flex: 3.5, fontSize: 15 }}>
      {value}
    </Text>
  </View>
);
HistoryCard = ({ date, toFrom, amount, comment, contextText, name }) => {
  // Change toFrom to be actual name of person
  let date_text = contextText === "sendHistory" ? "Date Sent" : "Date Received";
  let name_text = contextText === "sendHistory" ? "Receiver" : "Sender";
  return (
    <View style={{ ...styles.card }}>
      <SingleField text={date_text} value={date} />
      <SingleField text={name_text} value={`${name} (${toFrom})`} />
      <SingleField text="Amount" value={amount} />
      <SingleField text="Comment" value={comment} />
    </View>
  );
};
const schemaDefinition = {
  fullName: String,
  mitid: String,
  kerberos: String,
  giveBalance: { type: Number, default: 1000 },
  amountGiven: { type: Number, default: 0 },
  receiveBalance: { type: Number, default: 0 },
  votedCharity: { type: String, default: "" },
  selectedCharity: { type: String, default: "" },
  distinctSends: { kerbs: [String], number: Number },
  distinctReceives: { kerbs: [String], number: Number },
  sendHistory: [
    {
      date: Date,
      amount: Number,
      tofrom: String,
      comment: String,
      name: String,
    },
  ],
  receiveHistory: [
    {
      date: Date,
      amount: Number,
      tofrom: String,
      comment: String,
      name: String,
    },
  ],
};

export default HistoryList = ({ actualHistory, contextText }) => (
  <Content>
    {actualHistory.length !== 0 ? (
      <FlatList
        data={actualHistory.reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <HistoryCard
              date={moment(item.date).format("MM-DD-YYYY")}
              toFrom={item.tofrom}
              amount={item.amount}
              comment={item.comment}
              contextText={contextText}
              name={item.name}
            />
          );
        }}
      />
    ) : (
      <Text
        style={{
          marginTop: 40,
          flex: 1,
          alignSelf: "center",
          ...Fonts.regular_text,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Looks like you haven't sent or received any coins yet.{" "}
      </Text>
    )}
  </Content>
);

let styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#F194FF",
    borderWidth: 1,
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
});
