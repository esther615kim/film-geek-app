import React, { useState } from "react";
import { Text, View, Button, StyleSheet, Platform, Alert } from "react-native";
import { TextInput, Headline } from "react-native-paper";
import { Link } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./../firebase/config";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../redux/features/userSlice";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = { name, email, password };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        username: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      console.log(formDataCopy);

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      console.log("user registered");
      dispatch(ADD_USER(formData));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <View style={{ backgroundColor: "#333540", padding: 40, flex: 1 }}>
        <Headline style={{ color: "#fff" }}>Sign Up</Headline>
        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(name) => {
              setName(name);
            }}
          ></TextInput>
        </View>
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
            style={styles.input}
            secureTextEntry
            right={<TextInput.Icon name="eye" />}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
          ></TextInput>
        </View>
        <View>
          <TextInput style={styles.password}></TextInput>
        </View>

        <Button style={styles.button} title="Register" onPress={handleSubmit} />

        {/* navigate to Signup */}
        <Link style={{ padding: 20, textAlign: "center", color: "#fff" }} to={{ screen: "Home" }}>
          <Text
            onPress={() => {
              console.log("move to Login");
              // navigation.navigate("LoginPage");
            }}
          >
            Already signed up?
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  input: {
    width: "100%",
    height: 40,
  },
  password: {
    width: "100%",
    height: 40,
    marginTop: 20,
    marginBottom: 20,
  },

  button: {
    paddingTop: 20,
    width: "100%",
    height: 40,
  },
});
