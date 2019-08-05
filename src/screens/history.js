import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, ListItem, Header, Container, Content } from 'native-base';
import { UserContext } from '../UserContext.js'
import moment from 'moment';
import Bar from './bar.js';

export default class History extends React.Component {
    static contextType = UserContext;
    render(){
        const user = this.context.user
        return(
            <Container>
                <Header>
                    <Bar navigation={this.props.navigation}/>
                </Header>
                <Content>
                    <FlatList
                        data={user.transactionHistory.reverse()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                            return (
                                <ListItem>
                                    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text>{'Date: ' + moment(item.date).format('MM-DD-YYYY')}</Text>
                                        <Text>{'To/From: ' + item.tofrom}</Text>
                                        <Text>{'Amount: ' + item.amount}</Text>
                                        <Text>{'Comment: ' + item.comment}</Text>
                                    </View>
                                </ListItem>
                            )
                            }
                        }
                    />
                </Content>
            </Container>
        );
    }
}
