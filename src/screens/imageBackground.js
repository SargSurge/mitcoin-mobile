import imgLogo from "../../assets/images/logo192x192.png";
import React from "react";
import { ImageBackground } from "react-native";

export default Background = (props) => (
  <ImageBackground
    source={imgLogo}
    style={{
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      opacity: 0.026,
      flex: 1,
    }}
  />
);
