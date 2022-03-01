import React from "react";
import { StylesSHeet, TouchableOpacity, Text, ScrollView } from "react-native";

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
            width: 100,
            height: 50,
            padding: 10,
            backgroundColor: "#fdc453",
            borderRadius: 15,
            margin: 5,
          }}
        >
          Drama
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            padding: 10,
            backgroundColor: "#fe8d6f",
            borderRadius: 15,
            margin: 5,
          }}
        >
          Action
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            padding: 10,
            backgroundColor: "#9adbc5",
            borderRadius: 15,
            margin: 5,
          }}
        >
          History
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            padding: 10,
            backgroundColor: "#fdc453",
            borderRadius: 15,
            margin: 5,
          }}
        >
          Easy
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
