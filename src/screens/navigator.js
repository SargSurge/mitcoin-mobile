import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
} from "react-navigation";
import LoginScreen from "./login.js";
import SendScreen from "./send.js";
import HistoryScreen from "./history.js";
import CheckTokenScreen from "./checktoken.js";
import AboutScreen from "./about.js";
import ProfileScreen from "./profile.js";
import NotificationScreen from "./notifications.js";
import { DrawerItems } from "react-navigation-drawer";
import React from "react";
import { ScrollView, SafeAreaView, Image } from "react-native";
import imgLogo from "../../assets/images/logo192x192.png";

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Image
        source={imgLogo}
        style={{
          width: "100%",
          alignSelf: "center",
          height: 150,
          resizeMode: "contain",
          marginBottom: 16,
          marginTop: 8,
        }}
      />
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const AppDrawer = createDrawerNavigator(
  {
    Send: SendScreen,
    Profile: ProfileScreen,
    History: HistoryScreen,
    "About MITCoin": AboutScreen,
    Notifications: NotificationScreen,
  },
  { overlayColor: "#00000055", contentComponent: CustomDrawerContentComponent }
  // { drawerStyle: { width: "100%" } }
);
//comme
const navigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    CheckToken: CheckTokenScreen,
    Drawer: AppDrawer,
  },
  {
    // initialRouteName: "Login",
    // initialRouteName: "Drawer",
    initialRouteName: "CheckToken",
  }
);

const AppContainer = createAppContainer(navigator);
export default AppContainer;
