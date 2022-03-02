import { View, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from "react-native-paper";

import { fsDateToJsDate } from '../../utils';

export default function CommentListItem({ item, handleOnDeleteComment }) {
  const { comment, uid, username, comment_id, film_id, created_at } = item;

  // Format Date
  const jsDate = fsDateToJsDate(created_at);
  const dateString = jsDate.toLocaleDateString(); 
  const timeString = jsDate.toTimeString().substring(0,8);
  const subtitle = `Posted By ${username} on ${dateString} ${timeString}`;

  return (
      <View>
        <Card>
        <Card.Title title={comment} subtitle={subtitle} />
        <Card.Actions>
          {/* <Button onPress={() => handleOnDeleteComment(comment_id)}>Delete</Button> */}
        </Card.Actions>
        </Card>
      </View>
    );
  }
