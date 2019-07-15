import React from 'react';
import { Text , Button , View, TextInput} from 'react-native';
import { Input } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

export default class Send extends React.Component {
    render() {
        console.log('navparamsfasf', this.props.navigation.state.params);
        const user = this.props.navigation.getParam('user');
        return (
            <SafeAreaView>
                <Text>{user.kerberos}</Text>
                <Text>{"You have " + user.giveBalance + " MITcoins to give"}</Text>
                <Text>{"You have received " + user.receiveBalance + " MITcoins"}</Text> 
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
                <Text>Send Coins</Text>
                <Input placeholder="Receiver's kerberos"/>
                <Input placeholder="Amount"/>
                <View style={{height: 100, margin: 20, borderWidth: 2, borderColor: 'gray'}}>
                    <TextInput placeholder="Reason Why" multiline={true} numberOfLines={5}/>
                </View>
            </SafeAreaView>
        );
    }
}