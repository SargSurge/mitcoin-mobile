import React from "react";
import { Header, Body, Title, Right } from "native-base";
import Bar from "./bar.js";

export default HeaderFunction = ({ navigation, title }) => {
  return (
    <Header
      style={{ backgroundColor: "#982B39" }}
      // androidStatusBarColor="#8F3C44"
      androidStatusBarColor="#982B39"
      iosBarStyle="light-content"
    >
      <Bar navigation={navigation} />
      <Body style={{ flex: 1 }}>
        <Title
          style={{
            color: "white",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {title}
        </Title>
      </Body>
      <Right style={{ flex: 1 }} />
    </Header>
  );
};
