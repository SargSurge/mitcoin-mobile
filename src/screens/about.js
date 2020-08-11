import React from "react";
import { Container, Tabs, Tab } from "native-base";
import TheProject from "./about/theproject.js";
import TheCoins from "./about/thecoins.js";
import TheTeam from "./about/team.js";
import Header from "./header.js";

export default class About extends React.Component {
  render() {
    return (
      <Container>
        <Header navigation={this.props.navigation} title="About MITCoin" />

        <Tabs tabBarUnderlineStyle={{ backgroundColor: "#3177F0" }}>
          <Tab
            heading="The Project"
            activeTextStyle={{ color: "#3177F0" }}
            tabStyle={{ backgroundColor: "#F8F8F8" }}
            activeTabStyle={{ backgroundColor: "#F8F8F8" }}
            textStyle={{ color: "#919191" }}
          >
            <TheProject />
          </Tab>
          <Tab
            heading="Your Coins"
            activeTextStyle={{ color: "#3177F0" }}
            tabStyle={{ backgroundColor: "#F8F8F8" }}
            activeTabStyle={{ backgroundColor: "#F8F8F8" }}
            textStyle={{ color: "#919191" }}
          >
            <TheCoins />
          </Tab>
          <Tab
            heading="The Team"
            activeTextStyle={{ color: "#3177F0" }}
            tabStyle={{ backgroundColor: "#F8F8F8" }}
            activeTabStyle={{ backgroundColor: "#F8F8F8" }}
            textStyle={{ color: "#919191" }}
          >
            <TheTeam />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
