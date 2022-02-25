import { View, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { deleteComment } from "../../utils";

export default function CommentListItem({ item, handleOnDeleteComment }) {
  const { comment, username, comment_id, film_id, created_at } = item;

  // Format Date
  const dateString = created_at.toLocaleDateString(); 
  const timeString = created_at.toTimeString().substring(0,8);
  const subtitle = `Posted By ${username} ${dateString} ${timeString}`;

  return (
      <View>
        <Card>
        <Card.Title title={comment} subtitle={subtitle} />
        <Card.Actions>
          <Button onPress={() => handleOnDeleteComment(comment_id)}>Delete</Button>
        </Card.Actions>
        </Card>
      </View>
    );
  }
