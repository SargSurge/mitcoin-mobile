import React from 'react';
import { Content, Text } from 'native-base';

export default class TheProject extends React.Component{
    render() {
        return(
            <Content style={{flex: 1, paddingTop: 30}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>MITcoin is a charity project run by MIT MindHandHeart. It is our mission to empower charitable causes by rewarding good deeds performed around MIT's campus.</Text>
            </Content>
        )
    }
}
