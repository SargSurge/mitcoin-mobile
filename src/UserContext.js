import React, { createContext } from "react";

export const UserContext = createContext();

let userSample2 = {
  fullName: "Brian Ntanga",
  mitid: 6667788,
  kerberos: "bntanga",
  giveBalance: 5000,
  amountGiven: 20,
  receiveBalance: 50,
  votedCharities: [
    "My very long name charity Which is going to overflow",
    "Africa music",
    "Another charity",
  ],
  selectedCharity: "On the Rise",
  distinctSends: { kerbs: ["bntanga"], number: 4 },
  distinctReceives: { kerbs: ["ifyt"], number: 6 },
  sendHistory: [],
  receiveHistory: [
    {
      date: 66060505070708808008909090909090900990,
      amount: 10,
      tofrom: "bouth",
      comment: "Because i WANT",
      name: "Bint Outhman",
    },
  ],
};
export class UserProvider extends React.Component {
  state = {
    user: {},
    voting_closed: true,
    socket_object: null,
  };

  updateUser = (user) => {
    this.setState({ user: user });
  };
  updateVotingStatus = (status) => {
    this.setState({ voting_closed: status });
  };

  updateSocketObject = (socket) => {
    this.setState({ socket_object: socket });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          // user: userSample2,
          updateUser: this.updateUser,
          voting_closed: this.state.voting_closed,
          updateVotingStatus: this.updateVotingStatus,
          socket_object: this.state.socket_object,
          updateSocketObject: this.updateSocketObject,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
