import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

import { getComments, deleteComment } from "../utils/api";

import CommentsList from "../components/Comments/CommentsList";

export default function CommentsPage({ navigation, route }) {
  const [comments, setComments] = useState([]);

  function handleOnPress() {
    navigation.navigate("Add Comment");
  }

  function handleDeleteComment(comment_id) {
    // TODO Optimistic Render
    setComments( currComments =>
      currComments.filter((comment) => comment.comment_id !== comment_id)
    );
    deleteComment(comment_id)
      .catch(console.info('Delete Comment Failed'));
  }

  useEffect(() => {
    getComments().then((comments) => {
      setComments(comments);
    });
  }, [route.params?.newComment]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={styles.title}>Add Comment</Text>
      </TouchableOpacity>
      <CommentsList
        comments={comments}
        handleOnDeleteComment={handleDeleteComment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 10,
  },
});
