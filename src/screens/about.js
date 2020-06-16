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

        <Tabs>
          <Tab heading="The Project">
            <TheProject />
          </Tab>
          <Tab heading="Your Coins">
            <TheCoins />
          </Tab>
          <Tab heading="The Team">
            <TheTeam />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
