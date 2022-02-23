import * as React from "react";
import { Avatar } from "react-native-paper";
const G_LOGO = "../../../assets//GLogo.png";

const GAuth = () => {
  return (
    <div>
      {/* <Avatar.Image size={60} source={require(G_LOGO)} /> */}
      <Avatar.Icon size={60} icon="google"  />
    </div>
  );
};

export default GAuth;
