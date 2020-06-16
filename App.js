import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthSession } from "expo";
import Container from "./src/screens/navigator.js";
import { UserProvider } from "./src/UserContext";

export default class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <Container />
      </UserProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
