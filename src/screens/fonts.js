import { Platform, StyleSheet } from "react-native";

const Fonts = StyleSheet.create({
  regular_text: {
    ...Platform.select({
      ios: {
        fontFamily: "Georgia",
      },
      android: {
        fontFamily: "sans-serif",
      },
    }),
  },

  header: {
    ...Platform.select({
      ios: {
        fontFamily: "AvenirNextCondensed-Medium",
      },
      android: {
        fontFamily: "sans-serif-condensed",
      },
    }),
  },
});

export default Fonts;
