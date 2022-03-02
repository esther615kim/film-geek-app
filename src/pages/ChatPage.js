import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postUserMessage } from "../utils";
import { Button } from "react-native-paper";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";

import useChat from "../hooks/useChat";

import ChatsList from '../components/Chat/ChatsList';

export default function ChatPage({ navigation, route }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const userinfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    setLoggedIn(userinfo.isLoggedin);
    console.log(userinfo.isLoggedin);
  }, [userinfo]);

  const [username, setUsername] = useState("User1");
  const [message, setMessage] = useState("");
  const [isLoading, messages] = useChat(username);

  function handleOnPress() {
    console.log('USERINFO', userinfo);
    console.warn( username, message );
    postUserMessage({ uid: username, username, message }).then((message_id) => {
      console.log("message_id", message_id);
    });
  }

  return (
    <View style={styles.container}>
      {/* <View>
        <TouchableOpacity onPress={handleChatModalOnPress}>
          <Text style={styles.title}>Chat Modal</Text>
        </TouchableOpacity>
      </View> */}
      <View>
        {/* <Text>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          defaultValue={username}
          onChangeText={(username) => {
            setUsername(username);
          }}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="message"
          multiline={true}
          numberOfLines={3}
          value={message}
          onChangeText={(message) => setMessage(message)}
        />

          <Button icon="send" mode="contained" onPress={handleOnPress}>
           SEND
          </Button>
        {/* <TouchableOpacity 
        style={{backgroundColor:"#4e02e6",color:"#fff",color:"#fff",textAlign:"center", maringBottom:5, padding:6}}
        // style={(loggedIn) ? styles.button : styles.buttonDisabled} 
        disabled={!loggedIn} 
        onPress={handleOnPress}>

          <Text
          style={{color:"#fff"}} 
          // style={(loggedIn) ? styles.buttonText : styles.buttonTextDisabled}
          >
            Send</Text>
        </TouchableOpacity> */}
      </View>
      <View>
        <ChatsList messages={messages}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a152b"
    ,
    color:"#fff",
    padding: 20,
  },
  title: {
    padding: 10,
    marginBottom: 10,
  },
  input: {
    color:"#fff",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginBottom: 10,
  },
  // button: {
  //   height: 40,
  //   //width: 100,
  //   //backgroundColor: "magenta",
  //   backgroundColor: 'blue',
  //   // disabled: 'red',
  //   backgroundColor:"#f28852",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: 10,
  // // },
  // buttonDisabled: {
  //   height: 40,
  //   //width: 100,
  //   //backgroundColor: "magenta",
  //   backgroundColor:"#f28852",
  //   backgroundColor: 'black',
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  // buttonText: {
  //   backgroundColor:"#f28852",
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   color: 'white',
    
    // color: PRIMARY_TEXT_COLOUR
  // },
  // buttonTextDisabled: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   color: 'grey',
  // },
  // errorText: {
  //   color: "red",
  // },
});
