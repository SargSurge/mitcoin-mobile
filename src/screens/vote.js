import React from 'react';
import { Container, Header, Content, Text, Icon, Picker, } from "native-base";
import { UserContext } from '../UserContext.js';
import { WEB_URL } from '../config.js';
import Bar from './bar.js';

export default class Vote extends React.Component{
    static contextType = UserContext;

    state = {
    }

    componentDidMount() {
        votingKey = this.context.user.charity;
        switch(votingKey) {
            case 'key0':
                this.setState({selected: "key0"});
                break;
            case 'key1':
                this.setState({selected: "key1"});
                break;
            case 'key2':
                this.setState({selected: "key2"});
                break;
            case 'key3':
                this.setState({selected: "key3"});
                break;
            case 'key4':
                this.setState({selected: "key4"});
                break;
            case 'key5':
                this.setState({selected: "key5"});
                break;
            case 'key6':
                this.setState({selected: "key6"});
                break;
            case 'key7':
                this.setState({selected: "key7"});
                break;
            case 'key8':
                this.setState({selected: "key8"});
                break;
            case 'key9':
                this.setState({selected: "key9"});
                break;
            case 'key10':
                this.setState({selected: "key10"});
                break;
            case 'key11':
                this.setState({selected: "key11"});
                break;
            case 'key12':
                this.setState({selected: "key12"});
                break;
            default:
                this.setState({selected: null})
        }
    }

    async onValueChange(value: string){
        this.setState({
            selected: value
        });

        let body = JSON.stringify({
            mitid: this.context.user.mitid,
            charity: value
        });
        let response = await fetch(WEB_URL + 'api/charity-selection', { method: 'POST', headers: { 'Content-Type': 'application/json'} ,body: body });
        let responseJSON = await response.json();
        this.context.updateUser(responseJSON);
    }

    render(){
        return(
            <Container>
                <Header>
                    <Bar navigation={this.props.navigation} />
                </Header>
                <Content>
                    <Text>{this.state.selected ? 'Your selected charity is:': 'Please select a charity:'}</Text>
                    <Picker
                        mode="dropdown"
                        iosHeader="Vote for your charity"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="Kendall Community Group" value="key0" />
                        <Picker.Item label="CASPAR" value="key1" />
                        <Picker.Item label="Food for Free" value="key2" />
                        <Picker.Item label="NEADS" value="key3" />
                        <Picker.Item label="NAMI" value="key4" />
                        <Picker.Item label="BARCC" value="key5" />
                        <Picker.Item label="Somerville-Cambridge Elder Services" value="key6" />
                        <Picker.Item label="Shriner's Hospital for Children" value="key7" />
                        <Picker.Item label="On the Rise" value="key8" />
                        <Picker.Item label="Greater Boston Legal Services" value="key9" />
                        <Picker.Item label="Cambridge Public Library Literacy Project" value="key10" />
                        <Picker.Item label="International Institute of New England" value="key11" />
                        <Picker.Item label="New England Center for Homeless Veterans" value="key12" />
                    </Picker>
                </Content>
            </Container>
        )
    }
}
