import { View, Text } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { Chip } from "react-native-paper";

export default function MovieDetail({ movie }) {
  const { actors, plot, genres, director, title, runtime, year, id, posterUrl } = movie;
  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: posterUrl }} />
        <Card.Content>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Title>{title}</Title>
            <Text style={{ paddingLeft: 10 }}>{genres.join(", ")}</Text>
          </View>
          <Text style={{ fontStyle: "italic", textAlign: "center" }}>Directed by {director}</Text>
          <View
            style={{
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chip style={{ marginTop: 10, marginRight: 5, width: 85 }}>{runtime} mins</Chip>
            <Chip style={{ marginTop: 10, width: 60 }}>{year}</Chip>
          </View>

          <Paragraph>{plot}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}
