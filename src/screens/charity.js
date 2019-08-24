import React from 'react';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Button, Body, Title } from 'native-base';
import { UserContext } from '../UserContext.js';
import { WEB_URL } from '../config.js';
import Bar from './bar.js';

export default class Charity extends React.Component{
    static contextType = UserContext;

    state = {
        foodForFree: false,
        onTheRise: false,
        shrinerHospital: false
    }

    toggleRadio(radio) {
        updatedState = {}
        for(let each in this.state){
            if(radio === each){
                updatedState[each] = true;
            } else {
                updatedState[each] = false;
            } 
        } 
        this.setState(updatedState);
        console.log(this.state);
    }

    async updateCharity() {
        let charity = null;
        for(let radio in this.state){
            if(this.state[radio]){
                switch(radio){
                    case 'foodForFree': 
                        charity = 'Food for Free';
                        break;
                    case 'onTheRise':
                        charity = 'On the Rise';
                        break;
                    case 'shrinerHospital':
                        charity = "Shriner's Hospital for Children";
                        break;
                    default: 
                        charity = '';
                }
                break;
            }
        }
        let body = JSON.stringify({
            mitid: this.context.user.mitid,
            charity: charity
        });
        let response = await fetch(WEB_URL + 'api/charity-selection', { method: 'POST', headers: { 'Content-Type': 'application/json'} ,body: body });
        let responseJSON = await response.json();
        this.context.updateUser(responseJSON);
    }

    render(){
        const charity = this.context.user.charity;
        return(
            <Container>
                <Header>
                    <Bar navigation={this.props.navigation}/>
                    <Body style={{flex: 1}}>
                        <Title>Charity</Title>
                    </Body>
                    <Right style={{flex: 1}}/>
                </Header>
                <Content>
                    <Text>
                        {charity === "" ? "Please select a charity." : "Your MITcoins will be donated to " + charity + ". You can select another one from below."}
                    </Text>
                
                    <ListItem onPress={() => this.toggleRadio('foodForFree')}>
                        <Left>
                            <Text>Food for Free</Text>
                        </Left>
                        <Right>
                            <Radio onPress={() => this.toggleRadio('foodForFree')} selected={this.state.foodForFree} />
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => this.toggleRadio('onTheRise')}>
                        <Left>
                            <Text>On the Rise</Text>
                        </Left>
                        <Right>
                            <Radio onPress={() => this.toggleRadio('onTheRise')} selected={this.state.onTheRise} />
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => this.toggleRadio('shrinerHospital')}>
                        <Left>
                            <Text>Shriner's Hospital for Children</Text>
                        </Left>
                        <Right>
                            <Radio onPress={() => this.toggleRadio('shrinerHospital')} selected={this.state.shrinerHospital} />
                        </Right>
                    </ListItem>
                    <Button block onPress={() => this.updateCharity()}>
                        <Text>Confirm</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
