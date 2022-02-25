import * as React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GAuth = () => {
  const handleClickGoogle = async () => {
    console.log("clicked");
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = signInWithPopup(auth, provider);

      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      // check if user exists
      const userInfo = await getDoc(userRef);
      console.log("existing user", userInfo);

      if (!userInfo.exists()) {
        console.log("not existing");
        // add user info in firebase
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        console.log("new user added");
      }
      // navigate to Homepage
    } catch (err) {
      console.log("fail to authorize with Google");
      console.log(err);
    }
  };
  return (
    <View>
      <Avatar.Image
        onClick={handleClickGoogle}
        style={{ backgroundColor: "transparent" }}
        size={60}
        source={require("./googleIcon.svg")}
      />
    </View>
  );
};

export default GAuth;
