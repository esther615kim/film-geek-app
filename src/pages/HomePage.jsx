import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect } from "react";
import { Card, Title, Paragraph } from "react-native-paper";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const handlePress = (movieName) => {
  console.log(movieName);
};

const HomePage = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    async function getMovieData() {
      console.log("fetching");
      const docRef = doc(db, "movieData", "qWEaphXhRnZGlArWxqIo");
      const docSnap = await getDoc(docRef);
      console.log("fetched");
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
            <Card onPress={() => handlePress(movie.title)}>
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

export default HomePage;
