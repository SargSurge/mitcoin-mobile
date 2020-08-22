import React from "react";

import { View } from "react-native";

export default hamburger = (props) => {
  let one_line = (
    <View
      style={{
        width: 28,
        height: 2,
        backgroundColor: "white",
        borderRadius: 4,
      }}
    />
  );

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        height: 16,
      }}
    >
      {one_line}
      {one_line}
      {one_line}
    </View>
  );
};
