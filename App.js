import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Card } from "react-native-paper";
import SignUpPage from "./src/pages/SignUpPage";

export default function App() {
  return (

        <View style={styles.container}>
          <SignUpPage />
        </View>

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
