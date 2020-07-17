import React from "react";
import {} from "react-native";
import { Container, Tab, Tabs } from "native-base";
import { UserContext } from "../UserContext.js";
import HistoryList from "./historyList.js";
import Header from "./header.js";
import Background from "./imageBackground.js";
export default class History extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    this.context.socket_object.on("receive_history", (history) => {
      this.context.user.receiveCharity = history;
      this.setState({});
    });
  }
  render() {
    const user = this.context.user;
    // const user = userSample;
    return (
      <Container>
        <Background />
        <Header navigation={this.props.navigation} title={"History"} />
        <Tabs>
          <Tab heading="Send History">
            <HistoryList
              actualHistory={user.sendHistory}
              contextText="sendHistory"
            />
          </Tab>
          <Tab heading="Receive History">
            <HistoryList
              actualHistory={user.receiveHistory}
              contextText="receiveHistory"
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
