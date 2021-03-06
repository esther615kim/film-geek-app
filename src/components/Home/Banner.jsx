import React from "react";
import { TouchableOpacity, Text, ScrollView, View } from "react-native";

export default function Banner({ navigation }) {
  return (
    <View>
      <ScrollView horizontal indivatorSTyle={"white"} style={{ padding: 10 }}>
        <TouchableOpacity
          style={{
            width: 80,
            height: 40,
            padding: 10,
            backgroundColor: "#fdc453",
            textAlign: "center",
            borderRadius: 15,
            margin: 5,
          }}
          onPress={() => {
            navigation.navigate("Quiz", { difficulty: "easy" });
          }}
        >
          <Text>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 80,
            height: 40,
            padding: 10,
            backgroundColor: "#fe8d6f",
            textAlign: "center",
            borderRadius: 15,
            margin: 5,
          }}
          onPress={() => {
            navigation.navigate("Quiz", { difficulty: "medium" });
          }}
        >
          <Text>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 80,
            height: 40,
            padding: 10,
            textAlign: "center",
            backgroundColor: "#9adbc5",
            borderRadius: 15,
            margin: 5,
          }}
          onPress={() => {
            navigation.navigate("Quiz", { difficulty: "hard" });
          }}
        >
          <Text>Hard</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// const styles = StyleSheet.create({
//     button:{
//         width:100,
//         height:50,
//         padding:15,
//         backgroundColor:"#fdc453",
//         borderRadius:15,
//         margin:5,
//     }
// });
