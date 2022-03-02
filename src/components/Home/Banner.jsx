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
              <Subheading style={{fontSize:22,fontWeight:600, color:"#fff",padding:20, paddingBottom:5}}>Quizzes</Subheading>
      <ScrollView horizontal indivatorSTyle={"white"} style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={handleClickCard}
          style={{
          width: 140,
            height: 70,
            padding: 20,
            paddingLeft:42,
            paddingBottom:10,
            textAlign:"center",
            borderRadius: 15,
            margin: 10,
            border:"2px solid #58e065",
          }}
        >
 <Subheading style={{color:"#fff",fontSize:18}}>EASY</Subheading>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Quiz");
          }}
          style={{
            width: 140,
            height: 70,
            padding: 20,
            paddingLeft:30,
            paddingBottom:10,
            textAlign:"center",
            borderRadius: 15,
            margin: 10,
            border:"2px solid #1b6df2",
          }}
        >
           <Subheading style={{color:"#fff",fontSize:18}}>MEDIUM</Subheading>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 140,
            height: 70,
            padding: 20,
            PaddingLeft:40,
            paddingBottom:10,
            textAlign:"center",
            borderRadius: 15,
            color:"#fff",
            border:"2px solid #3bebe4",
            margin: 10,
          }}
        >
          <Subheading style={{color:"#fff",fontSize:20}}>HARD</Subheading>
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
