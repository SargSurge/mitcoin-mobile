import React, { createContext } from "react";
import * as SecureStore from "expo-secure-store";
import API from "./api-client";

export const UserContext = createContext();

export class UserProvider extends React.Component {
  state = {
    user: {},
    token: null
  };

  signIn = async (token) => {
    this.setState({ token });
    await SecureStore.setItemAsync("sessionToken", token);
    await this.refresh()
  };

  signOut = async (token) => {
    this.setState({ token: null });
    await SecureStore.deleteItemAsync("sessionToken", token);
  };

  isSignedIn = async () => {
    var token = await SecureStore.getItemAsync("sessionToken");

    if ( token ) {
      this.setState({ token });
      await this.refresh();

      // `refresh()` will reset token if the request fails
      return !!this.state.token;
    } else {
      return false;
    }
  };

  refresh = async () => {
    if ( this.state.token ) {
      var response = await fetch(
        API.path("/profile"),
        { headers: { Accept: "application/json", Authorization: `Bearer ${this.state.token}` } }
      );

      if ( response.status === 200 ) {
        var userData = await response.json();

        this.setState({ user: userData });
      } else {
        await this.signOut();
      }
    }
  };

  fetchHistory = async () => {
    var response = await fetch(
      API.path("/coin_transfers"),
      { headers: { Accept: "application/json", Authorization: `Bearer ${this.state.token}` } }
    );

    if ( response.status === 200 ) {
      return await response.json();
    } else {
      return { sent: [], received: [] };
    }
  };

  createSignInURL = async () => {
    var response = await fetch(
      API.path("/session_tokens"),
      {
        method: "POST",
        headers: { Accept: "application/json", Authorization: `Bearer ${this.state.token}` }
      }
    );

    if ( response.status === 200 ) {
      var json = await response.json();

      return json.url;
    }
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          refresh: this.refresh,
          isSignedIn: this.isSignedIn,
          signIn: this.signIn,
          signOut: this.signOut,
          createSignInURL: this.createSignInURL,
          fetchHistory: this.fetchHistory
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
