import {View, Text} from 'react-native';
import { Button, Card, Title, Paragraph } from "react-native-paper";

export default function MovieDetail() {
    return (
    <View>
    <Card>
      <Card.Cover
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfNHHohDH0H_3vWEP7OaB9J2qYbV3gwDEhT02FW87yJBhqZhZMPH4szOadffdEGoB8R4&usqp=CAU",
        }}
      />
      <Card.Content>
        <Title>The Batman</Title>
        <Paragraph>
          When the Riddler, a sadistic serial killer, begins murdering key
          political figures in Gotham, Batman is forced to investigate the
          city's hidden corruption and question his family's involvement.
        </Paragraph>
      </Card.Content>
    </Card>
  </View>);
}
