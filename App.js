import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { Card } from "react-native-paper";
import SignUpPage from "./src/pages/SignUpPage";
import LoginPage from "./src/pages/LoginPage";
import MyTabs from "./src/components/BottomNavigator";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

import MoviesPage from "./src/pages/MoviesPage";
import MovieModal from "./src/pages/MovieModal";
import { createStackNavigator } from "@react-navigation/stack";
const RootStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Group>
            <RootStack.Screen name="Movies" component={MoviesPage} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen name="View Movie" component={MovieModal} />
            {/* <RootStack.Screen name="Add Comment" component={CommentModal} /> */}
          </RootStack.Group>
        </RootStack.Navigator>

        {/* <MyTabs /> */}
      </NavigationContainer>
    </Provider>
  );
}
