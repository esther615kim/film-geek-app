import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect } from "react";
import { Card, Title, Paragraph, Searchbar } from "react-native-paper";

const MoviesPage = ({ navigation }) => {
  const [fullMoviesList, setFullMoviesList] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredMovies = fullMoviesList.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setMoviesData(filteredMovies);
  }, [searchTerm]);

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
        setFullMoviesList(docSnap.data().movies);
        setMoviesData(docSnap.data().movies);
      }
    }
    getMovieData();
  }, []);

  return (
    <ScrollView>
      <Searchbar placeholder="Search" onChangeText={(e) => setSearchTerm(e)} value={searchTerm} />
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
        <Text>Loading movies...</Text>
      )}
    </ScrollView>
  );
};

export default MoviesPage;
