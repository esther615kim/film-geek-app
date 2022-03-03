import { useState } from "react";
import { Text, View, ScrollView, Picker } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Headline, Subheading, Chip } from "react-native-paper";
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
    <ScrollView style={{ backgroundColor: "#0a152b", color: "#fff" }}>
      <Banner navigation={navigation} />
      <Subheading
        style={{ fontSize: 22, fontWeight: 600, color: "#fff", padding: 20, paddingBottom: 5 }}
      >
        Movies
      </Subheading>
      <ScrollView>
        {moviesData ? (
          <View style={{ margin: 15 }}>
            <Searchbar
              style={{ borderRadius: 10, color: "#fff", backgroundColor: "#fff", marginBottom: 5 }}
              placeholder="Search"
              onChangeText={(e) => setSearchTerm(e)}
              value={searchTerm}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                backgroundColor: "#0a152b",
                color: "#fff",
                paddingBottom: 5,
              }}
            >
              <Picker
                selectedValue={sortMethod}
                style={{ height: 40, width: 90, backgroundColor: "#0a152b", color: "#fff" }}
                onValueChange={(sortMethod) => handleSortMethodChange(sortMethod)}
              >
                <Picker.Item
                  style={{ backgroundColor: "#0a152b", color: "#fff", fontSize: 5 }}
                  label="Sort by"
                  value="unknown"
                  enabled={false}
                />
                <Picker.Item
                  style={{ backgroundColor: "#0a152b", color: "#fff", fontSize: 5 }}
                  label="Name (A-Z)"
                  value="name"
                />
                <Picker.Item
                  style={{ backgroundColor: "#0a152b", color: "#fff", fontSize: 5 }}
                  label="Year of Release (descending)"
                  value="year"
                />
              </Picker>
            </View>

            {moviesData.map((movie) => (
              <Card
                style={{ backgroundColor: "#363b57", padding: 5, marginBottom: 10 }}
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
                  <View >
                    <Title style={{ positon:"relative",color: "#fff", marginTop: 5, marginRight: 40 }}>
                      {movie.title}
                      <Text
                        style={{
                          position: "absolute",
                          right: -5,
                          borderRadius:10,
                          paddingLeft:12,
                          top:8,
                          paddingTop:-5,
                          color: "#212121",
                          backgroundColor: "#dbca09",
                          fontStyle: "italic",
                          width: 50,
                          fontWeight:600,
                          height: 26,
                          paddingBottom:2,
                          fontSize: 6,
                        }}
                      >
                        {movie.year}
                      </Text>
                    </Title>
                    <Paragraph style={{ color: "#eee" }}>{movie.plot}</Paragraph>
                    <View style={{ textAlign: "right" }}>

                    </View>
                  </View>
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
    </ScrollView>
  );
};

export default MoviesPage;
