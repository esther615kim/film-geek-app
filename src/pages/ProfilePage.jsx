import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Text, View } from "react-native";
import { Avatar, Card, Paragraph, Subheading, Button } from "react-native-paper";

export default function ProfilePage({navigation}) {
  const [user, setUser] = useState();
  const auth = getAuth();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log("username", user.auth.currentUser.email);
      setUser(user.auth.currentUser);
    });
  }, [auth]);

  const handleClickLogOut = () => {
    console.log("logout");
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

            <Paragraph>{user.email}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </>
  ) : (
    <>
      <Text style={{ color: "#fff", marginTop: 50 }}>Login required</Text>
    </>
  );
}
