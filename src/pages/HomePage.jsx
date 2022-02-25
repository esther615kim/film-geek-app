import React from "react";
import { Text, View } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect } from "react";

const HomePage = () => {
  const [moviesData, setMoviesData] = useState({});

  useEffect(() => {
    const docRef = doc(db, "moviesData", "oXH9AxZ3Qby7qmMt0DGq");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMoviesData(docSnap.data().results);
      console.log(moviesDadocSnap.data().results);
    }
  }, []);

  return (
    <View>
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;
