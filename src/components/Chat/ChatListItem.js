import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { isEven } from "../../utils";
export default function ChatListItem({ item, index }) {

    function handleClick() {
        console.log('Get Here');
    }

  return (
    <View style={isEven(index) ? styles.messageLeft : styles.messageRight} onClick={handleClick}>
      <Text style={styles.textUsername}>{item.username}</Text>
      <Text style={styles.textMessage}>{item.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    backgroundColor: "cyan",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    //borderBottomWidth: 10,
    //borderBottomColor: 'black'
  },
  messageLeft: {
    testAlign: 'left',
    backgroundColor: 'red', // TODO Use colour palette
    marginBottom: 4 // Space between lines
  },
  messageRight: {
    textAlign: 'right',
    backgroundColor: 'blue', // TODO Use colour palette
    marginBottom: 4, // Space between lines
  },
  textUsername: {
      padding: 2,
      color: 'yellow',
      fontSize: 12,
  },
  textMessage: {
    padding: 4,
      color: 'white',
      fontSize: 16,
  },
  button: {
    backgroundColor: 'LightBlue'
  }
});
