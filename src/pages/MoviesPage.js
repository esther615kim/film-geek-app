import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect } from "react";
import { Card, Title, Paragraph } from "react-native-paper";

const MoviesPage = ({ navigation }) => {
  const [moviesData, setMoviesData] = useState([]);

  function handlePress(movieID) {
    console.log(movieID);
    // // TODO Use currentUser Obj
    // const user = "Hamas";
    navigation.navigate("View Movie", { movieID: movieID });
  }

  useEffect(() => {
    async function getMovieData() {
      const docRef = doc(db, "movieData", "qWEaphXhRnZGlArWxqIo");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMoviesData(docSnap.data().movies);
      }
    }
    getMovieData();
  }, []);

  return (
    <ScrollView>
      {moviesData.length !== 0 ? (
        moviesData.map((movie) => (
          <View key={movie.id}>
            <Card onPress={() => handlePress(movie.id)}>
              <Card.Cover
                source={{
                  uri: movie.posterUrl,
                }}
              />
              <Card.Content>
                <Title>{movie.title}</Title>
                <Paragraph>{movie.plot}</Paragraph>
              </Card.Content>
            </Card>
          </View>
        ))
      ) : (
        <Text>Loading movies</Text>
      )}
    </ScrollView>
  );
};

export default MoviesPage;
