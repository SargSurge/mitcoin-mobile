import React from "react";
import Container from "./src/screens/navigator.js";
import { UserProvider, UserContext } from "./src/UserContext";
import * as Linking from "expo-linking";
import { NavigationActions } from "react-navigation";

class InnerApp extends React.Component {
  static contextType = UserContext;

  state = {
    initialUrl: null,
    processing: true
  };

  async componentDidMount() {
    Linking.addEventListener("url", this.returnToProfile);
  }

  returnToProfile = async (event) => {
    if ( this.navigation ) {
      var { path } = Linking.parse(event.url);
      var routeName;

      await this.context.refresh();

      switch ( path ) {
        case "profile":
          routeName = "Profile";
          break;

        case "send":
          routeName = "Send";
          break;
      }

      if ( routeName ) {
        var navigationAction = NavigationActions.navigate({ routeName: routeName });
        this.navigation.dispatch(navigationAction);
      }
    }
  };

  render() {
    return <Container ref={nav => { this.navigation = nav }} />;
  }
}

//This is so that the above component can access user context
export default class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <InnerApp />
      </UserProvider>
    );
  }
}
