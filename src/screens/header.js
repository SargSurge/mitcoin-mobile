import React from "react";
import { Header, Body, Title, Right } from "native-base";
import Bar from "./bar.js";

export default HeaderFunction = ({ navigation, title }) => {
  return (
    <Header>
      <Bar navigation={navigation} />
      <Body style={{ flex: 1 }}>
        <Title>{title}</Title>
      </Body>
      <Right style={{ flex: 1 }} />
    </Header>
  );
};
