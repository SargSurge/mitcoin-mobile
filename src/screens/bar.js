import React from 'react';
import { Left, Button, Icon } from 'native-base';

export default class Bar extends React.Component{
    render(){
        return(
            <Left style={{flex: 1}}>
                <Button transparent onPress={() => this.props.navigation.openDrawer() }>
                    <Icon name='menu' />
                </Button>
            </Left>
        );
    }
}
