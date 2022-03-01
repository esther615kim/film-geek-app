import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { getComments, deleteComment } from "../utils/api";
import { postUserComment } from "../utils/api";

import useComments from "../hooks/useComments";
import MovieDetail from "../components/Movies/MovieDetail";
import CommentsList from "../components/Comments/CommentsList";


export default function MovieModal({ route, navigation }) {
  const { movie } = route.params;

  const [loggedIn, setLoggedIn] = useState(false);
  const userinfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    setLoggedIn(userinfo.isLoggedin);
    console.log(userinfo.isLoggedin);
  }, [userinfo]);

  const [username, setUsername] = useState("User1"); // TODO set uid
  const [filmId, setFileId] = useState(movie?.id);
  const [errors, setErrors] = useState([]);
  const [comment, setComment] = useState([]);
  const [isLoading, comments] = useComments(filmId);

  function handleOnSubmit() {
    if (!comment) {
      // Not showing in Web
      Alert.alert("comment", "Comment must not be blank.");
      setErrors((curr) => [...curr, "Comment must not be blank."]);
    } else {
      const newComment = { filmId, uid: username, username, comment }; // TODO DisplayName Needed
      postUserComment(newComment).then((id) => {
        newComment.comment_id = id;
        newComment.created_at = new Date();
        //setComments((currComments) => [newComment, ...currComments]);
      });
      setErrors([]);
    }
  }

  function handleDeleteComment(comment_id) {
    // TODO Optimistic Render
    // setComments((currComments) =>
    //   currComments.filter((comment) => comment.comment_id !== comment_id),
    // );
    deleteComment(comment_id).catch(console.info("Delete Comment Failed"));
  }

  function ErrorMessages({ errors }) {
    return (
      <View>
        <Text>{errors.length > 0 ? <Text style={styles.errorText}>{errors[0]}</Text> : null}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <MovieDetail movie={movie} />
      <View>
        <Text style={styles.title}>Add a Comment</Text>
        {/* <Text>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          defaultValue={username}
          onChangeText={setUsername}
        /> */}
        <Text>Comment</Text>
        <TextInput
          style={styles.input}
          placeholder="comment"
          multiline={true}
          numberOfLines={3}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <ErrorMessages errors={errors}></ErrorMessages>
      </View>
      <View>
        <CommentsList comments={comments} handleOnDeleteComment={handleDeleteComment} />
      </View>
    </ScrollView>
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
