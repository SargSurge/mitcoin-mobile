import React, { createContext } from "react";

export const UserContext = createContext();

// export const UserProvider = props => {
//     const variableTest = 'hola'
//     return (
//         <UserContext.Provider value={ user }>
//             {props.children}
//         </UserContext.Provider>
//     );
// };

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
  state = { user: {}, voting_closed: true, initial_login: false };

  updateUser = (user) => {
    this.setState({ user: user });
  };
  updateVotingStatus = (status) => {
    this.setState({ voting_closed: status });
  };
  updateInitialLogin = (status) => {
    this.setState({ initial_login: status });
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
          initial_login: this.state.initial_login,
          updateInitialLogin: this.updateInitialLogin,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
