import React from 'react';
import { StyleSheet } from 'react-native';
import { Content, Card, CardItem, Text, H2 } from 'native-base';

export default class TheTeam extends React.Component{
    render(){
        return(
            <Content style={styles.container}>
                <Card>
                    <CardItem header>
                        <H2>W. Craig Carter</H2>
                    </CardItem>
                    <CardItem style={styles.cardItemList}>
                        <Text>POSCO</Text>
                    </CardItem>
                    <CardItem style={styles.cardItemList}>
                        <Text>Professor of Materials Science and Engineering</Text>
                    </CardItem>
                    <CardItem style={styles.cardItemList}>
                        <Text>MacVicar Fellow</Text>
                    </CardItem>
                    <CardItem style={styles.cardItemList}>
                        <Text>MITcoin Creator</Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>ccarter@mit.edu</Text>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header>
                        <H2>Mary Beth Wagner</H2>
                    </CardItem>
                    <CardItem style={styles.cardItemList}>
                        <Text>Graduate Student</Text>
                    </CardItem>
                    <CardItem style={styles.cardItemList}>
                        <Text>Department of Materials Science and Engineering</Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>mbwagner@mit.edu</Text>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header>
                        <H2>Maisie O'Brien</H2>
                    </CardItem>
                    <CardItem style={styles.cardItemList}>
                        <Text>Communications and Community Engagement Manager at MindHandHeart</Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>maisieob@mit.edu</Text>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header>
                        <H2>Issac Redlon</H2>
                    </CardItem>
                    <CardItem style={styles.cardItemList}>
                        <Text>Web Developer</Text>
                    </CardItem>
                    <CardItem style={styles.cardItemList}>
                        <Text>EECS</Text>
                    </CardItem>
                    <CardItem footer>
                        <Text>iredlon@mit.edu</Text>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header>
                        <H2>Timmy Xiao</H2>
                    </CardItem>
                    <CardItem footer>
                        <Text>mitimmy@mit.edu</Text>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    cardItemList: {
        paddingTop: 0,
        paddingBottom: 5
    }
});
