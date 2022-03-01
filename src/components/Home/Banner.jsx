import React from "react";
import { TouchableOpacity, Text, ScrollView } from "react-native";

export default function Banner() {
  const handleClickCard = (e) => {
    e.preventDefault();
    console.log("category", e.target.value);
  };
  return (
    <div>
      <ScrollView horizontal indivatorSTyle={"white"} style={{ padding: 10 }}>
        <TouchableOpacity
          style={{
            width: 80,
            height: 40,
            padding: 10,
            backgroundColor: "#fdc453",
            textAlign:"center",
            borderRadius: 15,
            margin: 5,
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
            textAlign:"center",
            borderRadius: 15,
            margin: 5,
          }}
        >
          <Text>Difficult</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 80,
            height: 40,
            padding: 10,
            textAlign:"center",
            backgroundColor: "#9adbc5",
            borderRadius: 15,
            margin: 5,
          }}
        >
          <Text>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 80,
            height: 40,
            padding: 10,
            backgroundColor: "#3275a8",
            textAlign:"center",
            borderRadius: 15,
            margin: 5,
          }}
        >
          <Text>Drama</Text>
        </TouchableOpacity>
      </ScrollView>
    </div>
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
