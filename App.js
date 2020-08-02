import React from "react";
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
