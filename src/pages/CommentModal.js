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

  const [comment, setComment] = useState("Great Action Film");

  function handleOnSubmit() {
    console.log('submit comment: ', comment, comment.length, comment.isEmpty());
    if ((!comment) || comment.length === 0) {
      Alert.alert("Comment must not be blank.");
    } else {
      const newComment = { film_id: "key3", username, comment };
      postUserComment(newComment).then((id) => {
        newComment.comment_id = id;
        navigation.navigate("Comments", { newComment });
      });
    }
  }

  function handleOnPress() {
    console.log("cmt", comment);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Comment Form</Text>
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
});
