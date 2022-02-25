import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";



//import { getComments, deleteComment } from "../utils/api";
//import CommentsList from "../components/Comments/CommentsList";

export default function MoviesPage({ navigation, route }) {

// TODO Refactor - Wrappped Esther's Auth Code  
// import { getAuth } from "firebase/auth";

//   const [user, setUser] = useState();
//   const auth = getAuth();

//   useEffect(() => {
//     return auth.onAuthStateChanged((user) => {
//       setUser(user.auth.currentUser);
//     });
//   }, [auth]);
// TODO REfactor End

  const [movies, setMovies] = useState([]);

  function handleOnPress() {
      // TODO Use currentUser Obj
    const user = "Hamas";
    navigation.navigate("View Movie", { user });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={styles.title}>View MovieDetails</Text>       
      </TouchableOpacity>
    </View>
  );
}

{/* <MoviesList
movies={movies}
/> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 10,
  },
});


