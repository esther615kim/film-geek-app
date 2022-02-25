import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { Card } from "react-native-paper";
import SignUpPage from "./src/pages/SignUpPage";
import LoginPage from "./src/pages/LoginPage";
import MyTabs from "./src/components/BottomNavigator";
import {Provider} from "react-redux";
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    </Provider>
  );
}

