import * as React from "react";
import { Avatar } from "react-native-paper";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
const G_LOGO = "../../../assets//GLogo.png";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const GAuth = () => {
  const handleClickGoogle = async () => {
    console.log("clicked");
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = signInWithPopup(auth,provider);

      const user = result.user;
      console.log("result",result)

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
    <div>
      {/* <Avatar.Image size={60} source={require(G_LOGO)} /> */}
      <Avatar.Icon onClick={handleClickGoogle} size={60} icon="google" />
    </div>
  );
};

export default GAuth;

