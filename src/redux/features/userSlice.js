import { useEffect } from "react";
import { createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

let localUserData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  localData: localUserData,
  username: localUserData ? localUserData.user : null,
  email: localUserData ? localUserData.email : null,
  isLoggedin: localUserData ? localUserData.isLoggedin : null,
  id:localUserData ? localUserData.id : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login
    ADD_USER(state, action) {
      const newUser = {
        ...action.payload,
      };
      console.log("slice new user", newUser);

      if (state.email === newUser.email) {
        return;
      }

      state.username = newUser.name;
      state.email = newUser.email;
      state.isLoggedin = true;
      console.log("slice user added", state.email, state.username, state.isLoggedin);
      // local storage
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: state.username,
          email: state.email,
          isLoggedin: state.isLoggedin,
          id:state.id,
        }),
      );
    },
    // logout
    LOGOUT(state) {
      // firebase
      const auth = getAuth();
      auth.signOut();

      // REDUX
      localUserData = null;
      console.log("local", localUserData);
      localStorage.removeItem("user");
      // additional
      state.email = null;
      state.isLoggedin = false;
      state.username = null;
      console.log("user logged out", state.isLoggedin);
    },
    ADD_USERNAME(state, action) {
      const userName = {
        ...action.payload,
      };
      state.username = userName;
      console.log("name updated", state.username);
      // local storage
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: state.username,
          email: state.email,
          isLoggedin: state.isLoggedin,
          id:state.id,
        }),
      );
    },
    ADD_ID(state,action) {
        // add user iD 
        const userId = {
            ...action.payload,
          };
        state.id = userId;
        console.log("ID updated", state.id);
              // local storage
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: state.username,
          email: state.email,
          isLoggedin: state.isLoggedin,
          id:state.id,
        }),
      );
    }
  },
});

export const { ADD_USER, LOGOUT, ADD_USERNAME,ADD_ID } = userSlice.actions;
export default userSlice.reducer;
