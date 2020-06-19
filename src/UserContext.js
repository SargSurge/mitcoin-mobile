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
