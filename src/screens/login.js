import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';
import * as SecureStore from 'expo-secure-store';

import { CLIENT_ID, WEB_URL } from '../config.js';

const authurlstart = 'https://oidc.mit.edu/authorize?response_type=code&redirect_uri='

export default class Login extends React.Component {
    state = {
        result: null,
    };

    render() {
        return (
          <View style={styles.container}>
            <Button title="Login" onPress={this.handlePress} />
          </View>
        );
    }

    handlePress = async () => {
        let redirectURL = AuthSession.getRedirectUrl();
        let result = await AuthSession.startAsync({
            authUrl: authurlstart + encodeURIComponent(redirectURL) + '&client_id=' + CLIENT_ID
        });
        let code = result.params.code;
        let response = await fetch(WEB_URL + 'auth/get_token?code=' + code);
        let responseJSON = await response.json();
        //console.log('result from logging in: \n', responseJSON);

        if (responseJSON){
            await SecureStore.setItemAsync('accessToken', responseJSON.access_token);
            await SecureStore.setItemAsync('refreshToken', responseJSON.refresh_token);
            this.props.navigation.navigate('Send',{
                user: responseJSON.user
            });
        } else {
            console.log("ERRRRRRR");
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});