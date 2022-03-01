import { View, Text, FlatList } from "react-native";

import ChatListItem from "./ChatListItem";

export default function ChatsList({ messages }) {
  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.message_id}
        renderItem={({ item, index }) => <ChatListItem item={item} index={index} />}
      ></FlatList>
    </View>
  );
}
