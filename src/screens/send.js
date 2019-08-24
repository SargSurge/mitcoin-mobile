import React from 'react';
import { Header, Container, Content, Form, Item, Input, View, H1, Button, Text, Spinner, Label, Body, Title, Right } from 'native-base';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../UserContext.js';
import { WEB_URL } from '../config.js';
import Bar from './bar.js';


export default class Send extends React.Component {
    static contextType = UserContext;

    state = {
        receiverKerberos: '',
        amount: '',
        comment: ''
    };

    handlePress = async (values, actions) => {
        let body = JSON.stringify({
            giverKerberos: this.context.user.kerberos,
            receiverKerberos: values.receiverKerberos,
            amount: values.amount,
            comment: values.comment
        });

        let response = await fetch(WEB_URL + 'api/idsend', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: body});
        let responseJSON = await response.json();
        console.log('this is a new transaction', responseJSON);
        this.context.updateUser(responseJSON);
        await actions.setSubmitting(false);
        await actions.resetForm();
    };

    validationSchema = yup.object().shape({
        receiverKerberos: yup.string().required('Required!').test(
            'validkerbmatch',
            'Cannot send to self', 
            value => value !== this.context.user.kerberos),
        amount: yup.number().min(1, 'Invalid Amount!').max(parseInt(this.context.user.giveBalance), 'Invalid Amount!').required('Required!')
    }) 

    render() {
        const user = this.context.user
        return (
            <Container>
                <Header>
                    <Bar navigation={this.props.navigation} />
                    <Body style={{flex: 1}}>
                        <Title>Send Coins</Title>
                    </Body>
                    <Right style={{flex: 1}}/>
                </Header>
                <Content> 
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text>{user.kerberos}</Text>
                        <Text>{"You have " + user.giveBalance + " MITcoins to give."}</Text>
                        <Text>{"You have received " + user.receiveBalance + " MITcoins."}</Text>
                        <View style={{width: '100%', borderBottomColor: 'black', borderBottomWidth: 0.5 }} />
                        <Text>{'\n'}</Text>
                    </View>
                    <ScrollView>
                        <KeyboardAvoidingView behavior='padding' enabled>
                            <H1 style={{textAlign: 'center'}}>Send Coins</H1>
                            <Formik
                             initialValues={{ receiverKerberos: '', amount: '', comment: '' }}
                             onSubmit={this.handlePress}
                             validationSchema={this.validationSchema}
                            >
                                {formikProps => (
                                    <Form>
                                        <View style={{flexDirection: 'row'}}>
                                            <Item style={{flex: 8}} stackedLabel>
                                                <Label style={{color:"red"}}>{formikProps.errors.receiverKerberos && formikProps.touched.receiverKerberos ? formikProps.errors.receiverKerberos : null }</Label>
                                                <Input autoCapitalize='none' autoCorrect={false} value={formikProps.values.receiverKerberos} placeholder="Receiver's kerberos" onChangeText={formikProps.handleChange('receiverKerberos')}/>
                                            </Item>
                                            <Item style={{flex: 2}} stackedLabel>
                                                <Label style={{color:"red"}}>{formikProps.errors.amount && formikProps.touched.amount ? formikProps.errors.amount : null }</Label>
                                                <Input value={formikProps.values.amount} placeholder='Amount' onChangeText={formikProps.handleChange('amount')}/>
                                            </Item>
                                        </View>
                                        <Item regular>
                                            <Input value={formikProps.values.comment} placeholder='Reason Why' multiline={true} numberOfLines={3} style={{height: 100 }} onChangeText={formikProps.handleChange('comment')}/>
                                        </Item>
                                        {formikProps.isSubmitting ? (
                                            <Spinner />
                                        ): (
                                        <Button block danger onPress={formikProps.handleSubmit}>
                                            <Text>Submit</Text>
                                        </Button>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </KeyboardAvoidingView>
                    </ScrollView>
               </Content>
            </Container>
        );
    }
}
