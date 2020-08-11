import React from "react";
import Container from "./src/screens/navigator.js";
import { UserProvider, UserContext } from "./src/UserContext";
import io from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import { WEB_URL } from "./src/config.js";

//Hacky solution to do init socket from here
class App2 extends React.Component {
  static contextType = UserContext;

  init_socket = async () => {
    const socket = io(WEB_URL);
    socket.on("connect", async () => {
      this.context.updateSocketObject(socket);
      //why does this work?
      // await this.init_socket_part_2();
      setTimeout(this.init_socket_part_2, 3000);
    });
  };

  init_socket_part_2 = async () => {
    let token;
    try {
      token = await SecureStore.getItemAsync("refreshToken");
    } catch (error) {
      console.error(error);
      console.log("cannot fetch refresh token");
      return;
    }

    let body = JSON.stringify({
      socketid: this.context.socket_object.id,
      kerberos: this.context.user.kerberos,
    });
    let response;
    try {
      response = await fetch(`${WEB_URL}api/initsocket`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: body,
      });
    } catch (error) {
      console.error(error);
      console.log("cannot init socket");
    }

    this.everythingSocketOn();
  };

  everythingSocketOn = () => {
    this.context.socket_object.on("charity_selected", (charity) => {
      this.context.user.selectedCharity = charity;
      let newUser = this.context.user;
      this.context.updateUser(newUser);
    });

    this.context.socket_object.on("charities_voted", (voted_charities) => {
      this.context.user.votedCharities = voted_charities;

      let newUser = this.context.user;
      this.context.updateUser(newUser);

      // this.context.updateUser(this.context.user);
    });

    this.context.socket_object.on(
      "receive_coins",
      ({ receiveHistory, receiveBalance, distinctReceives }) => {
        this.context.user.receiveHistory = receiveHistory;
        this.context.user.receiveBalance = receiveBalance;
        this.context.user.distinctReceives = distinctReceives;
        let newUser = this.context.user;
        this.context.updateUser(newUser);
      }
    );
  };

  async componentDidMount() {
    this.init_socket();

    // setTimeout(this.init_socket_part_2, 3000);
    // this.everythingSocketOn();
  }

  render() {
    return <Container />;
  }
}

export default class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <App2 />
      </UserProvider>
    );
  }
}
