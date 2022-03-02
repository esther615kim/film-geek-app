import { useState } from "react";
import { Text, View, ScrollView, Picker } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect } from "react";

import Banner from "../components/Home/Banner";
import { Card, Title, Paragraph, Searchbar } from "react-native-paper";
import Pagination from "../components/Pagination";

const MoviesPage = ({ navigation }) => {
  const [fullMoviesList, setFullMoviesList] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [sortMethod, setSortMethod] = useState("unknown");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = 10;

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    setMoviesData(fullMoviesList.slice(indexOfFirstMovie, indexOfLastMovie));
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm) {
      const filteredMovies = fullMoviesList.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setMoviesData(filteredMovies);
    }
  }, [searchTerm]);

  useEffect(() => {
    async function getMovieData() {
      const docRef = doc(db, "movieData", "qWEaphXhRnZGlArWxqIo");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const indexOfLastMovie = currentPage * moviesPerPage;
        const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
        setMoviesData(docSnap.data().movies.slice(indexOfFirstMovie, indexOfLastMovie));
        setFullMoviesList(docSnap.data().movies);
      }
    }
    getMovieData();
  }, []);

  const handleSortMethodChange = (sortMethod) => {
    setSortMethod(sortMethod);
    if (sortMethod === "name") {
      const sortedMovies = moviesData.sort((a, b) => a.title.localeCompare(b.title));
      setMoviesData(sortedMovies);
    } else if (sortMethod === "year") {
      const sortedMovies = moviesData.sort((a, b) => b.year - a.year);
      setMoviesData(sortedMovies);
    }
  };

  return (
    <>
      <Banner />
      <ScrollView>
        {moviesData ? (
          <View>
            <Searchbar
              placeholder="Search"
              onChangeText={(e) => setSearchTerm(e)}
              value={searchTerm}
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Picker
                selectedValue={sortMethod}
                style={{ height: 50, width: 150 }}
                onValueChange={(sortMethod) => handleSortMethodChange(sortMethod)}
              >
                <Picker.Item label="Sort by" value="unknown" enabled={false} />
                <Picker.Item label="Name (A-Z)" value="name" />
                <Picker.Item label="Year of Release (descending)" value="year" />
              </Picker>
            </View>

            {moviesData.map((movie) => (
              <Card
                key={movie.id}
                onPress={() => {
                  navigation.navigate("View Movie", { movie });
                }}
              >
                <Card.Cover
                  source={{
                    uri: movie.posterUrl,
                  }}
                />
                <Card.Content>
                  <Title>{movie.title}</Title>
                  <Paragraph>{movie.plot}</Paragraph>
                  <Text style={{ fontStyle: "italic", textAlign: "right" }}>{movie.year}</Text>
                </Card.Content>
              </Card>
            ))}
            <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={fullMoviesList.length}
              paginate={paginate}
            />
          </View>
        ) : (
          <Text>Loading movies...</Text>
        )}
      </ScrollView>
    </>
  );
};

export default MoviesPage;
