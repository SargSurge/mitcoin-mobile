import React from 'react';
import { Text, FlatList, View, StyleSheet} from 'react-native';
import { UserContext } from '../UserContext.js'
import moment from 'moment';

export default class History extends React.Component {
    static contextType = UserContext;
    render(){
        const user = this.context.user
        return(
        <View>
            <FlatList
                data={user.transactionHistory.reverse()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <View>
                            <Text>{'Date: ' + moment(item.date).format('MM-DD-YYYY')}</Text>
                            <Text>{'To/From: ' + item.tofrom}</Text>
                            <Text>{'Amount: ' + item.amount}</Text>
                            <Text>{'Comment: ' + item.comment}</Text>
                            <View
                                style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                        </View>
                    )
                }
            }
            />
        </View>
        );
    }
}
