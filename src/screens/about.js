import React from 'react';
import { Header, Container, Tabs, Tab } from'native-base';
import Bar from './bar.js';
import TheProject from './about/theproject.js';
import TheCoins from './about/thecoins.js';
import TheTeam from './about/team.js';

export default class About extends React.Component {
    render () {
        return(
            <Container>
                <Header hasTabs>
                    <Bar navigation={this.props.navigation}/>
                </Header>

                <Tabs>
                    <Tab heading='The Project'>
                        <TheProject />
                    </Tab>
                    <Tab heading='Your Coins'>
                        <TheCoins />
                    </Tab>
                    <Tab heading='The Team'>
                        <TheTeam />
                    </Tab>
                </Tabs>
            </Container>
        );
    }    
}


