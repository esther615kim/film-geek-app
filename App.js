import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { Card } from "react-native-paper";
import SignUpPage from "./src/pages/SignUpPage";
import LoginPage from "./src/pages/LoginPage";
import MyTabs from './src/components/BottomNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#333540",
  },
});
