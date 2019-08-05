import React from 'react';
import { Content, Text, H2 } from 'native-base';

export default class TheCoins extends React.Component{
    render() {
        return(
            <Content>
                <H2>Your Wallets</H2>
                <Text>When you make an account, you're given 1000 MITcoins. You can give these away, but you can't give away coins that you've received.</Text>

                <H2>Sending Coins</H2>
                <Text>If someone does a good deed for you, like helping you with a problem set, or baking you a plate of cookies... send them a few MITcoins!</Text>

                <H2>Charity</H2>
                <Text>At the end of the semester, all of the MITcoins you've received will be converted to dollars that you donate to the charity of your choice.</Text>

            </Content>
        )
    }
}
