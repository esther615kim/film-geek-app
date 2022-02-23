import { View, Text, FlatList } from "react-native";

import CommentListItem from "./CommentListItem";

export default function CommentsList({ comments }) {
  return (
    <View>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentListItem item={item} />}
        keyExtractor={(item) => item.comment_id}
      ></FlatList>
    </View>
  );
}
