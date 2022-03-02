import { View, Text } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

export default function MovieDetail({ movie }) {
 const {
    actors, plot, genres, director, title, runtime, year, id, posterUrl } = movie;
  return (
    <View>
      <Card>
        <Card.Cover
          source={posterUrl}
        />
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>
            {plot}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}
