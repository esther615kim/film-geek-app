import { useEffect, useState } from "react";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";

import { postUserComment, getComments, getUserComments } from "../utils/api";

import CommentsList from '../components/Comments/CommentsList';

export default function CommentsPage({navigation, route}) {
  const [comments, setComments] = useState([]);

  function handleOnPress() {
    navigation.navigate('Add Comment');
  };

  console.log('router: ', route.params); // TODO uc[]
  
  useEffect(() => {

    getComments().then((comments) => {
      setComments(comments);
    });
  }, []);

  return (
  <View>
        <TouchableOpacity onPress={handleOnPress}>
          <Text>Add Comment</Text>
        </TouchableOpacity>
    <CommentsList comments={comments} />
  </View>);
}
