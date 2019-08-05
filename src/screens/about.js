import React from 'react';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Header, Container, Content, Text, H1, H2 } from'native-base';
import { View, StyleSheet } from 'react-native';
import Bar from './bar.js';

export default class About extends React.Component {
    render () {
        return(
            <Container>
                <Header>
                    <Bar navigation={this.props.navigation}/>
                </Header>
                <Content>
                    <Grid>
                        <Row style={{borderBottomColor:'black', borderBottomWidth:1}}>
                            <View style={styles.center}>
                                <H1>The Project</H1>
                                <Text>MITcoin is a charity project run by MIT MindHandHeart. It is our mission to empower charitable causes by rewarding good deeds performed around MIT's campus.</Text>
                            </View>
                        </Row>
                        <Row>
                            <Col style={styles.center}>
                               <H2>Your Wallets</H2>
                               <Text>When you make an account, you're given 1000 MITcoins. You can give these away, but you can't give away coins that you've received.</Text>
                            </Col>
                           
                            <Col style={styles.center}>
                               <H2>Sending Coins</H2>
                               <Text>If someone does a good deed for you, like helping you with a problem set, or baking you a plate of cookies... send them a few MITcoins!</Text>
                            </Col>

                            <Col style={styles.center}>
                               <H2>Charity</H2>
                               <Text>At the end of the semester, all of the MITcoins you've received will be converted to dollars that you donate to the charity of your choice.</Text>
                            </Col>
                        </Row>
                        <View
                            style={{
                                 borderBottomColor: 'black',
                                 borderBottomWidth: 1,
                            }}
                        />
                        <Row>
                            <View style={styles.center}>
                                <H2 style={{textDecorationLine:'underline', textDecorationColor:'black'}} >Our Team</H2>
                                <Text>W. Craig Carter</Text>
                                <Text style={{textAlign:'center'}}>POSCO Professor of Materials Science and Engineering</Text>
                                <Text>MacVicar Fellow</Text>
                                <Text>MITcoin Creator</Text>
                                <Text>{'ccarter@mit.edu' + '\n'}</Text>
                                <Text>Mary Beth Wagner</Text>
                                <Text>Graduate Student</Text>
                                <Text>Department of Materials Science and Engineering</Text>
                                <Text>{'mbwagner@mit.edu' + '\n'}</Text>
                                <Text>Maise O'Brien</Text>
                                <Text style={{textAlign:'center'}}>Communications and Community Engagement Manager at MindHandHeart</Text>
                                <Text>{'maisieob@mit.edu' + '\n' }</Text>
                                <Text>Issac Redlon </Text>
                                <Text>Web Developer</Text>
                                <Text>EECS</Text>
                                <Text>{"iredlon@mit.edu" + '\n'}</Text>

                                <Text>Timmy Xiao</Text>
                                <Text>mitimmy@mit.edu</Text>
                            </View>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }    
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        textAlign: 'center'
    }
});
