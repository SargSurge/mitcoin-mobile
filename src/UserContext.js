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
    state = {test: ''};

    updateCharity = (charity) => {
        this.setState({ charity: charity });
    }

    render() {
        return (
            <UserContext.Provider value={{
                user: this.state,
                updateUser: user => {this.setState(user)},
                updateCharity: this.updateCharity
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
