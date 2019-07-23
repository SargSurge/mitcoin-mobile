import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import React from 'react';
import { Icon } from 'native-base'; 
import LoginScreen from './login.js';
import SendScreen from './send.js';
import HistoryScreen from './history.js';
import CheckTokenScreen from './checktoken.js';
import AboutScreen from './about.js';
import CharityScreen from './charity.js';

function renderHamburgerMenu(navigation) {
    return (
        <Icon name='menu' onPress={ () => navigation.toggleDrawer() }/>
    );
}

const SendStack = createStackNavigator({
    Send: {
        screen: SendScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Send',
            headerLeft: renderHamburgerMenu(navigation)
        })
    }
});

const HistoryStack = createStackNavigator({
    History: {
        screen: HistoryScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'History',
            headerLeft: renderHamburgerMenu(navigation)
        })
    }
})

const AboutStack = createStackNavigator({
    About: {
        screen: AboutScreen,
        navigationOptions: ({navigation}) => ({
            title: 'About',
            headerLeft: renderHamburgerMenu(navigation)
        })
    }
})

const CharityStack = createStackNavigator({
    Charity: {
        screen: CharityScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Charity',
            headerLeft: renderHamburgerMenu(navigation)
        })
    }
})

const AppDrawer = createDrawerNavigator(
    { 
        Send: SendStack,
        History: HistoryStack,
        About: AboutStack,
        Charity: CharityStack
    },
    // {
    //     initialRouteName: 'Send',
    // }
);

const navigator = createSwitchNavigator(
    {
        Login: LoginScreen,
        CheckToken: CheckTokenScreen,
        Drawer: AppDrawer
    },
    {
        initialRouteName: "CheckToken"
    }
);

const AppContainer = createAppContainer(navigator);
export default AppContainer;
