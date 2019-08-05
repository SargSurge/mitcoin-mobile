import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import LoginScreen from './login.js';
import SendScreen from './send.js';
import HistoryScreen from './history.js';
import CheckTokenScreen from './checktoken.js';
import AboutScreen from './about.js';
import CharityScreen from './charity.js';

const AppDrawer = createDrawerNavigator(
    { 
        Send: SendScreen,
        History: HistoryScreen,
        About: AboutScreen,
        Charity: CharityScreen
    },
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
