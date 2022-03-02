import React from "react";
import { Headline, Subheading } from 'react-native-paper';
import { Link } from "@react-navigation/native";
import { TouchableOpacity, Text, ScrollView, View } from "react-native";

export default function Banner({ navigation, moveToQuizPage }) {
  const handleClickCard = () => {
    moveToQuizPage();
  };
  return (
    <View>
              <Subheading style={{fontSize:22,fontWeight:600, padding:20, paddingBottom:5}}>Quizzes</Subheading>
      <ScrollView horizontal indivatorSTyle={"white"} style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={handleClickCard}
          style={{
            minWdth: 100,
            height: 80,
            padding: 20,
            paddingBottom:15,
            textAlign:"center",
            backgroundColor: "#fe8d6f",
            borderRadius: 15,
            color:"#fff",
            margin: 10,
          }}
        >
 <Subheading style={{color:"#fff",fontSize:20}}>Movies:Easy</Subheading>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Quiz");
          }}
          style={{
            minWdth: 100,
            height: 80,
            padding: 20,
            paddingBottom:15,
            textAlign:"center",
            backgroundColor:"#9adbc5",
            backgroundColor:"#3275a8",
            borderRadius: 15,
            margin: 10,
          }}
        >
           <Subheading style={{color:"#fff",fontSize:20}}>Movies:Medium</Subheading>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            minWdth: 100,
            height: 80,
            padding: 20,
            paddingBottom:15,
            textAlign:"center",
            backgroundColor:"#9adbc5",
            borderRadius: 15,
            color:"#fff",
            margin: 10,
          }}
        >
          <Subheading style={{color:"#fff",fontSize:20}}>Movies:Difficult</Subheading>
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
