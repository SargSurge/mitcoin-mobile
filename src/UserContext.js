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
    state = {};

    updateUser = user => {this.setState(user)}

    render() {
        return (
            <UserContext.Provider value={{
                user: this.state,
                updateUser: this.updateUser
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
