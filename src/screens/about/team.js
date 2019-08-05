import React from 'react';
import { Content, Text } from 'native-base'

export default class TheTeam extends React.Component{
    render(){
        return(
            <Content>
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
            </Content>
        )
    }
}
