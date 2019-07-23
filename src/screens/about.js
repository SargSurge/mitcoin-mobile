import React from 'react';
import { Text, View } from 'react-native';

export default class About extends React.Component {
    render () {
        return(
            <View>
                <Text>The Project</Text>
                <Text>MITcoin is a charity project run by MIT MindHandHeart. It is our mission to empower charitable causes by rewarding good deeds performed around MIT's campus.
                </Text>

                <Text>Your wallets</Text>
                <Text>When you make an account, you're given 1000 MITcoins. You can give these away, but you can't give away coins that you've received.</Text>
                
                <Text>Sending Coins</Text>
                <Text>If someone does a good deed for you, like helping you with a problem set, or baking you a plate of cookies... send them a few MITcoins!</Text>

                <Text>Charity</Text>
                <Text>At the end of the semester, all of the MITcoins you've received will be converted to dollars that you donate to the charity of your choice.</Text>

                <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}
                />

                <Text>Our Team</Text>
                <Text>W. Craig Carter</Text>
                <Text>POSCO POSCO Professor of Materials Science and Engineering
                    MacVicar Fellow
                    MITcoin Creator
                    ccarter@mit.edu
                </Text>
                <Text>Mary Beth Wagner</Text>
                <Text>
                    Graduate Student
                    Department of Materials Science and Engineering
                    mbwagner@mit.edu
                </Text>
                <Text>Maise O'Brien</Text>
                <Text>
                    Communications and Community Engagement Manager at MindHandHeart
                    maisieob@mit.edu
                </Text>
                <Text>Issac Redlon </Text>
                <Text>
                    Web Developer
                    Department of Electrical Engineering and Computer Science
                    iredlon@mit.edu
                </Text>
                <Text>Timmy Xiao</Text>
                <Text>mitimmy@mit.edu</Text>
            </View>
        );
    }    
}
