import React from 'react';
import { Text , Button , View, TextInput} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { UserContext } from '../UserContext.js';
import { WEB_URL } from '../config.js';


export default class Send extends React.Component {
    static contextType = UserContext;

    state = {
        receiverKerberos: '',
        amount: '',
        comment: ''
    };

    handlePress = async () => {
        let body = JSON.stringify({
            giverKerberos: this.context.user.kerberos,
            receiverKerberos: this.state.receiverKerberos,
            amount: this.state.amount,
            comment: this.state.comment
        });
        console.log(body);

        let response = await fetch(WEB_URL + 'api/idsend', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: body});
        let responseJSON = await response.json();
        console.log('this is a new transaction', responseJSON);
    };

    render() {
        const user = this.context.user
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
                <TextInput placeholder="Receiver's kerberos" onChangeText={receiverKerberos => this.setState({receiverKerberos})} value={this.state.receiverKerberos}/>
                <TextInput placeholder="Amount" onChangeText={amount => this.setState({amount})} value={this.state.amount}/>
                <View style={{height: 100, margin: 20, borderWidth: 2, borderColor: 'gray'}}>
                    <TextInput placeholder="Reason Why" multiline={true} numberOfLines={5} onChangeText={comment => this.setState({comment})} value={this.state.comment}/>
                </View>
                <Button title='Submit' onPress={() => this.handlePress()}/>
            </SafeAreaView>
        );
    }
}
