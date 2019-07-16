import React, {createContext} from 'react';

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
    state = {test: 'hello hola test'};

    render() {
        return (
            <UserContext.Provider value={{
                user: this.state,
                updateUser: async user => {this.setState(user)}
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}