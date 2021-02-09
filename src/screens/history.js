import React from "react";
import {} from "react-native";
import { Container, Tab, Tabs } from "native-base";
import { UserContext } from "../UserContext.js";
import HistoryList from "./historyList.js";
import Header from "./header.js";
import Background from "./imageBackground.js";

export default class History extends React.Component {
  static contextType = UserContext;

  state = {
    sent: [],
    received: []
  };

  componentDidMount() {
    this.context.fetchHistory().then((data) => {
      this.setState(data);
    });
  }

  render() {
    return (
      <Container>
        <Background />
        <Header navigation={this.props.navigation} title={"History"} />
        <Tabs tabBarUnderlineStyle={{ backgroundColor: "#3177F0" }}>
          <Tab
            activeTextStyle={{ color: "#3177F0" }}
            textStyle={{ color: "#919191" }}
            tabStyle={{ backgroundColor: "#F8F8F8" }}
            activeTabStyle={{ backgroundColor: "#F8F8F8" }}
            heading="Send History"
          >
            <HistoryList
              actualHistory={this.state.sent}
              contextText="sendHistory"
            />
          </Tab>
          <Tab
            heading="Receive History"
            activeTextStyle={{ color: "#3177F0" }}
            tabStyle={{ backgroundColor: "#F8F8F8" }}
            activeTabStyle={{ backgroundColor: "#F8F8F8" }}
            textStyle={{ color: "#919191" }}
          >
            <HistoryList
              actualHistory={this.state.received}
              contextText="receiveHistory"
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
