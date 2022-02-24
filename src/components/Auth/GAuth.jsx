import * as React from "react";
import { Avatar } from "react-native-paper";
import { View } from "react-native";
const G_LOGO = "../../../assets//GLogo.png";

const GAuth = () => {
  return (
    <View>
      {/* <Avatar.Image size={60} source={require(G_LOGO)} /> */}
      <Avatar.Icon size={60} icon="google" />
    </View>
  );
};

export default GAuth;
