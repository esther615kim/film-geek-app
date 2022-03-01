import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postUserMessage } from "../utils";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";

//import useAuth from "../hooks/useAuth";
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
  const [message, setMessage] = useState("My name is User1");

  //const [isLoggedIn, currentUser] = useAuth();
  const [isLoading, messages] = useChat(username);

  // function handleChatModalOnPress() {
  //   navigation.navigate("Add Chat");
  // }

  function handleOnPress() {
    console.log('USERINFO', userinfo);
    console.warn( username, message );
    postUserMessage({ user_id: userinfo.email, username, message }).then((message_id) => {
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
        <Text>Message</Text>
        <TextInput
          style={styles.input}
          placeholder="message"
          multiline={true}
          numberOfLines={3}
          value={message}
          onChangeText={(message) => setMessage(message)}
        />
        <TouchableOpacity style={(loggedIn) ? styles.button : styles.buttonDisabled} disabled={!loggedIn} onPress={handleOnPress}>
          <Text style={(loggedIn) ? styles.buttonText : styles.buttonTextDisabled}>Send</Text>
        </TouchableOpacity>
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
    padding: 10,
  },
  title: {
    padding: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    height: 40,
    //width: 100,
    //backgroundColor: "magenta",
    backgroundColor: 'blue',
    // disabled: 'red',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    height: 40,
    //width: 100,
    //backgroundColor: "magenta",
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'white',
    // color: PRIMARY_TEXT_COLOUR
  },
  buttonTextDisabled: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'grey',
  },
  errorText: {
    color: "red",
  },
});
