import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  // DrawerItems,
  // DrawerNavigator,
} from "react-navigation";
import LoginScreen from "./login.js";
import SendScreen from "./send.js";
import HistoryScreen from "./history.js";
import CheckTokenScreen from "./checktoken.js";
import AboutScreen from "./about.js";
//import CharityScreen from './charity.js';
import VoteScreen from "./vote.js";
import ProfileScreen from "./profile.js";
import imgLogo from "../../assets/images/logo192x192.png";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  View,
  H1,
  Button,
  Spinner,
  Label,
  Text,
  Header,
} from "native-base";
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Platform,
  Image,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Send from "./send.js";
// import { Header } from "react-native/Libraries/NewAppScreen";

// const Drawer = createDrawerNavigator();

// MyDrawer = () => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Send" component={SendScreen} />
//       <Drawer.Screen name="History" component={HistoryScreen} />
//     </Drawer.Navigator>
//   );
// };

const AppDrawer = createDrawerNavigator(
  {
    "About MITCoin": AboutScreen,
    Profile: ProfileScreen,
    Send: SendScreen,
    History: HistoryScreen,

    //Charity: CharityScreen,
    // Vote: VoteScreen,
  }
  // { drawerStyle: { width: "100%" } }
);

// const myDrawer = DrawerNavigator(
//   {
//     "About MITCoin": { screen: AboutScreen },
//     Profile: { screen: ProfileScreen },
//     Send: { screen: SendScreen },
//     History: { screen: HistoryScreen },
//   },
//   {
//     initialRouteName: "Send",
//     drawerPosition: "left",
//     contentComponent: image_container,
//     drawerOpenRoute: "DrawerOpen",
//     drawerCloseRoute: "DrawerClose",
//     drawerToggleRoute: "DrawerToggle",
//   }
// );
const navigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    CheckToken: CheckTokenScreen,
    Drawer: AppDrawer,
  },
  {
    // initialRouteName: "Login",
    initialRouteName: "Drawer",
  }
);

// const image_container = (props) => (
//   <Container>
//     <Header style={{ height: 200 }}>
//       <Body>
//         <Image
//           style={{ width: 150, height: 150, borderRadius: 75 }}
//           source={imgLogo}
//         />
//       </Body>
//     </Header>
//     <DrawerItems {...props} />
//   </Container>
// );

const AppContainer = createAppContainer(navigator);
export default AppContainer;
