import React, { useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { TextInput, Headline, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GAuth from "../components/Auth/GAuth";
import { useDispatch } from "react-redux";
import { ADD_USER,ADD_ID } from "../redux/features/userSlice";
import { ADD_USERNAME } from "../redux/features/userSlice";

export default function LoginPage({ navigation }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_id,setId] = useState(null);

  const formData = { email, password };
  const dispatch = useDispatch();

  const handleClickSignUp = () => {
    navigation.navigate("Sign Up");
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    console.log("exisiting info", formData);

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (userCredential.user) {
        // handling async
        auth.onAuthStateChanged(() => {
          setUser(userCredential.user.displayName);
          console.log("updated username", user);
          user && dispatch(ADD_USERNAME(user));
          // ID
          setId(user.uid);
          user_id&& dispatch(ADD_ID(user_id));
        });


        dispatch(ADD_USER(formData));
        navigation.navigate("Landing");
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
          <Button icon="account" mode="contained" onPress={handleClickSubmit}>
            Log In
          </Button>
        </View>
        <Text
          style={{ padding: 20, textAlign: "center", color: "#fff" }}
          onPress={handleClickSignUp}
        >
          Sign Up?
        </Text>
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
