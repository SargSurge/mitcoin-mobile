import React from 'react';
import { Text, FlatList, View } from 'react-native';

export default class History extends React.Component {
    render(){
        const user = this.props.navigation.getParam('user');
        console.log('userINFO', user)
        return(
        <View>
            <Text>This is the history page.</Text>
            <FlatList
                data={user.transactionHistory}
                renderItem={({transaction}) => <Text>{transaction.amount}</Text>}
            />
        </View>
        );
    }
}