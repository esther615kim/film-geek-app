import React, { useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { TextInput, Headline, Button } from "react-native-paper";
import { Link } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./../firebase/config";
import GAuth from "../components/Auth/GAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      if (userCredential.user) {
        console.log("logged in!");
        // navigate to Main Page
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <View style={{ backgroundColor: "#333540", padding: 40, flex: 1 }}>
        <Headline style={{ color: "#fff" }}>Login</Headline>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.password}
            value={password}
            secureTextEntry
            right={<TextInput.Icon name="eye" />}
            onChangeText={(password) => {
              setPassword(password);
            }}
          ></TextInput>
          <Button icon="account" mode="contained" onPress={handleSubmit}>
            Log In
          </Button>
        </View>
        {/* navigate to Signup */}
        <Link   to={{ screen: "Quiz" }}>
          <Text>Sign Up?</Text>
        </Link>
        <View style={styles.view}>
          <GAuth />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    padding: Platform.OS === "android" ? 12 : 10,
    paddingBottom: 40,
    textAlign: "center",
    color: "#fff",
  },
  label: {
    height: 40,
    width: "40%",
    color: "#fff",
    paddingTop: 15,
  },
  signup: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    padding: 40,
    paddingBottom: 20,
  },
  input: {
    minWidth: 240,
    height: 40,
  },
  button: {
    backgroundColor: "blue",
  },
  password: {
    width: "100%",
    height: 40,
    marginBottom: 40,
  },
});
