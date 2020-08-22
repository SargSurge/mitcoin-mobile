import React from "react";
import { Left, Button, Icon } from "native-base";
import { View } from "react-native";
import Hamburger from "./hamburger";

export default class Bar extends React.Component {
  render() {
    return (
      <Left style={{ flex: 1 }}>
        <Button
          transparent
          onPress={() => this.props.navigation.openDrawer()}
          style={{ marginLeft: 4 }}
        >
          <View>
            <Hamburger />
          </View>
        </Button>
      </Left>
    );
  }
}
