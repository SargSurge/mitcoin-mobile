import React from "react";
import { Left, Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default class Bar extends React.Component {
  render() {
    return (
      <Left style={{ flex: 1 }}>
        <Button
          transparent
          onPress={() => this.props.navigation.openDrawer()}
          style={{ marginLeft: 4 }}
        >
          <Ionicons name="ios-menu" size={32} color="white" />
        </Button>
      </Left>
    );
  }
}
