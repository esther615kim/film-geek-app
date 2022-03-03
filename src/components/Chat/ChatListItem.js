import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { isEven } from "../../utils";

export default function ChatListItem({ item, index }) {
  return (
    <View style={{paddingTop:5,color:"#212121",position:"relative"}}>
    <View style={isEven(index) ? styles.messageLeft : styles.messageRight}>
      <Text style={isEven(index) ? styles.textRightusername : styles.textusername}>{isEven(index) ?"Zak":"user1"}</Text>
      <Text style={isEven(index) ? styles.textRightMessage : styles.textMessage}>{item.message}</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    // backgroundColor: "cyan",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    //borderBottomWidth: 10,
    //borderBottomColor: 'black'
  },
  messageLeft: {
    margin:5,
    textAlign: 'left',
    paddingBottom:6,
    paddingLeft:20,
    borderRadius:15,
    opacity:0.85,
    color:"#212121", // TODO Use colour palette
    marginBottom:5,// Space between lines
    border:"1px solid #eee",
    width:"80%"
  },
  
  messageRight: {
    margin:5,
    textAlign: 'right',
    marginLeft:"20%",
    paddingRight:20,
    color:"#212121",
    borderRadius:15,
    paddingBottom:6,
    backgroundColor: "#f5f3cb", // TODO Use colour palette
    marginBottom: 5, // Space between lines
    width:"80%"
  },
  textUsername: {
      padding: 2,
      color: '#212121',
      fontSize: 12,
  },
  textRightusername :{
    color:"#fff",
  },
  textMessage: {
    padding: 2,
      color: '#212121',
      fontSize: 16,
  },
  textRightMessage:{
    color:"#fff",
  }
});
