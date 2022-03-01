import React, { useState, useEffect } from "react";

import Constants from "expo-constants";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  FlatList,
  Alert,
} from "react-native";

import { postUserComment } from "../utils/api";

export default function CommentModal({ navigation }) {
  // TODO Add Current User
  const [username, setUsername] = useState("User1");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  // TODO Use actual film
  const film_id = Math.floor(Math.random() * 10 + 1);

  function handleOnSubmit() {
    if (!comment) {
      // Not showing in Web
      Alert.alert("comment", "Comment must not be blank.");
      setErrors((curr) => [...curr, "Comment must not be blank."]);
    } else {
      const newComment = { film_id: "key3", username, comment };
      postUserComment(newComment).then((id) => {
        newComment.comment_id = id;
        navigation.navigate("Comments", { newComment });
      });
      setErrors([]);
    }
  }

  function ErrorMessages({ errors }) {
    return (
      <View>
        <Text>
          {errors.length > 0 
          ? (<Text style={styles.errorText}>{errors[0]}</Text>) 
          : null}
        </Text>
      </View>
    );
/*
    if (errors.length > 0) {
      console.log("Display Errors");
      return (
        <View>
          <FlatList
            data={errors}
            renderItem={({ error }) => <Text>{error}</Text>}
            keyExtractor={(item, index) => index}
          ></FlatList>
        </View>
      );
    } else {
      console.log("Display NO Errors", errors);
      return <></>;
    }*/
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Comment</Text>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        defaultValue={username}
        onChangeText={setUsername}
      />
      <Text>Comment</Text>
      <TextInput
        style={styles.input}
        placeholder="comment"
        multiline="true"
        numberOfLines={3}
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <ErrorMessages errors={errors}></ErrorMessages>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    height: 50,
    backgroundColor: "magenta",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
  },
});
