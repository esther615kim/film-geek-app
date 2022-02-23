import { View, Text } from 'react-native';

export default function CommentListItem({ item }) {
    return (
      <View>
        <Text>
          {item.username}&nbsp;
          {item.comment}&nbsp;
          {item.comment_id}
          {item.film_id}
        </Text>
      </View>
    );
  }
