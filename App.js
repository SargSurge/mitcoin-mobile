import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthSession } from 'expo'
import Container from './src/screens/navigator.js';
import { UserProvider } from './src/UserContext';

export default class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <Container />
      </UserProvider>
    );
  }

  // state = {
  //   access_token: '',
  //   refresh_token: '',
  //   result: null
  // }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Button title="Login" onPress={this.handlePress} />
  //       {this.state.result ? (
  //         <Text>{JSON.stringify(this.state.result)}</Text>
  //       ) : null}
  //       <Button title='Verify Test' onPress={this.verifyPress} />
  //     </View>
  //   );
  // }

  // handlePress = async () => {
  //   let redirectURL = AuthSession.getRedirectUrl();
  //   let result = await AuthSession.startAsync({
  //     authUrl:'https://oidc.mit.edu/authorize?response_type=code&redirect_uri=' + encodeURIComponent(redirectURL) + '&client_id=' + CLIENT_ID
  //   });
  //   let code = result.params.code;
  //   let response = await fetch('http://localhost:3000/auth/get_token?code=' + code);
  //   let responseJSON = await response.json();
  //   this.setState({
  //     access_token: responseJSON.access_token,
  //     refresh_token: responseJSON.refresh_token,
  //     result: responseJSON.user
  //   });
  // }

  // verifyPress = async () => {
  //   let options = {
  //     headers: {
  //       Authorization: 'Bearer ' + this.state.access_token
  //     }
  //   };
  //   try{
  //     let response = await fetch('http://localhost:3000/auth/verify', options);
  //     let responseTEXT = await response.text();
  //     console.log('this is a test', responseTEXT);
  //   }catch(e) {
  //     console.error(e);
  //   }
  // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
