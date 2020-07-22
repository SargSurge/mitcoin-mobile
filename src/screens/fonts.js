import { Platform, StyleSheet } from "react-native";

const Fonts = StyleSheet.create({
  regular_text: {
    ...Platform.select({
      ios: {
        fontFamily: "Georgia",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
  },

  header: {
    ...Platform.select({
      ios: {
        fontFamily: "AvenirNextCondensed-Medium",
      },
      android: {
        fontFamily: "Notoserif",
      },
    }),
  },
});

export default Fonts;
