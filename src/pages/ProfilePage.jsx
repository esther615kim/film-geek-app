import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Text, View } from "react-native";
import { Avatar, Card, Paragraph, Subheading, Button,Divider } from "react-native-paper";
import { useSelector } from "react-redux";

export default function ProfilePage({navigation}) {
  const [user, setUser] = useState();
  const auth = getAuth();
  const userinfo = useSelector((state) => state.userInfo); // to display

  useEffect(() => {
    // firebase
    // return auth.onAuthStateChanged((user) => {
    //   console.log("email", user.auth.currentUser.email);
    // });
    console.log("slice",userinfo)

  }, [userinfo]);

  const handleClickLogOut = () => {
    console.log("logout");
    auth.signOut();

    navigation.navigate("Landing");
  };


  return user ? (
    <>
      <View style={{ padding: 40, flex: 1, alignItems: "center", backgroundColor: "#333540" }}>
        <Avatar.Icon style={{ marginTop: 50 }} size={60} icon="account-circle-outline" />
        <Button mode="text" onPress={handleClickLogOut}>
          <Text style={{ color: "#fff" }}>LOG OUT</Text>
        </Button>
        <Card style={{ width: "80%", margin: 20 }}>
          <Card.Content>
            <Subheading>{user.displayName}</Subheading>
            {/* <Paragraph>{user.currentUser}</Paragraph>
            <Paragraph>{user.email}</Paragraph> */}

          </Card.Content>
        </Card>
                    <Divider/>
      </View>
    </>
  ) : (
    <>
      <Text style={{margin: 50 }}>Login required</Text>
    </>
  );
}
