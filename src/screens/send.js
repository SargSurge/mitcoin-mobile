import React from 'react';
import { Container, Content, Form, Item, Input, View, H1, Button, Text, Spinner } from 'native-base';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { UserContext } from '../UserContext.js';
import { WEB_URL } from '../config.js';


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

    render() {
        const user = this.context.user
        return (
            <Container>
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
                            >
                                {formikProps => (
                                    <Form>
                                        <View style={{flexDirection: 'row'}}>
                                            <Item style={{flex: 8}} regular>
                                                <Input value={formikProps.values.receiverKerberos} placeholder="Receiver's kerberos" onChangeText={formikProps.handleChange('receiverKerberos')}/>
                                            </Item>
                                            <Item style={{flex: 2}} regular>
                                                <Input value={formikProps.values.amount} placeholder='Amount' onChangeText={formikProps.handleChange('amount')}/>
                                            </Item>
                                        </View>
                                        <Item regular>
                                            <Input value={formikProps.values.comment} placeholder='Reason Why' multiline={true} numberOfLines={3} style={{height: 100 }} onChangeText={formikProps.handleChange('comment')}/>
                                        </Item>
                                        {formikProps.isSubmitting ? (
                                            <Spinner />
                                        ): (
                                        <Button block regular onPress={formikProps.handleSubmit}>
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
