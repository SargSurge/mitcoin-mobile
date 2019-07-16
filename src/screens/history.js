import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { UserContext } from '../UserContext.js'

export default class History extends React.Component {
    static contextType = UserContext;
    render(){
        const user = this.context.user
        return(
        <View>
            <Text>This is the history page.</Text>
            <FlatList
                data={user.transactionHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (<Text>{item.amount}</Text>)}
            }
            />
        </View>
        );
    }
}