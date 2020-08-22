import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import moment from "moment";
import Fonts from "./fonts.js";
import Background from "./imageBackground.js";

let SingleField = ({ text, value }) => (
  <View
    style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}
  >
    <Text
      style={{
        ...Platform.select({
          ios: {
            fontWeight: "600",
            fontSize: 15,

            ...Fonts.header,
            flex: 1.5,
          },
          android: {
            fontSize: 15,
            fontWeight: "bold",
            color: "#3B4049",
            flex: 1.6,
          },
        }),
      }}
    >
      {text}:{" "}
    </Text>
    <Text
      style={{ ...Fonts.regular_text, flex: 3.5, fontSize: 15, paddingLeft: 2 }}
    >
      {value}
    </Text>
  </View>
);
let HistoryCard = ({ date, toFrom, amount, comment, contextText, name }) => {
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

export default HistoryList = ({ actualHistory, contextText }) => {
  //This is to avoid mutating the history array. Mutating it causes a bug when reversing the array
  actualHistory = [...actualHistory];
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Background />
      {actualHistory.length !== 0 ? (
        <FlatList
          data={actualHistory.reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <HistoryCard
                date={moment(item.date).format("MMMM Do YYYY, h:mm a")}
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
            marginTop: 30,
            alignSelf: "center",
            ...Fonts.regular_text,
            fontSize: 18,
            textAlign: "center",
            height: "100%",
          }}
        >
          {contextText === "sendHistory"
            ? "Looks like you haven't sent any coins yet."
            : "Looks like you haven't received any coins yet"}
        </Text>
      )}
    </View>
  );
};

let styles = StyleSheet.create({
  card: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#9CD6B0",
    borderWidth: 1,
    padding: 20,
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
