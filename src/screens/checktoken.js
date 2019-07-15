import React from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { WEB_URL } from '../config.js';

export default class CheckToken extends React.Component {
    componentDidMount = async () => {
        // Check if there is a token stored to skip logging in
        const token = await SecureStore.getItemAsync('accessToken');
        if (!token){
            this.props.navigation.navigate('Login');
            return;
        }

        // Check if the token is still valid 
        try {
            let options = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };

            // let response = await fetch(WEB_URL + 'auth/verify', options);
            // let responseJSON = await response.json();
            //console.log(responseJSON);
            if (false){//responseJSON.active){
                this.props.navigation.navigate('Send');
            } else {
                // const refreshToken = await SecureStore.getItemAsync('refreshToken');
                // let options = { headers: { Authorization: 'Bearer ' + refreshToken } };

                // let refreshResponse = await fetch(WEB_URL + 'auth/refresh', options);
                // let refreshJSON = await refreshResponse.json();
                // console.log('aa', refreshJSON);
                this.props.navigation.navigate('Login');
            }
        } catch (err){
            this.props.navigation.navigate('Login');
        }

    }

    render() {
        return (
            <Text>Loading...</Text>
        );
    }
}