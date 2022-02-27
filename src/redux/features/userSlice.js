import { createSlice } from '@reduxjs/toolkit';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    getAdditionalUserInfo,
  } from "firebase/auth";
  import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const initialState = {
    userInfo:[{username:null,email:null}],
    isLoggedin:false
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        // login
        ADD_USER(state,action){
            const newUser = {...action.payload};
            state.userInfo[0].username = newUser.name;
            state.userInfo[0].email = newUser.email;
            console.log("user logged in",state.userInfo);
        },
        // logout
        LOGOUT(state){
            state.userInfo = null;
            state.isLoggedin = false;
            console.log("user logged out",state);
        }
        
    }
})

export const {ADD_USER,LOGOUT} =userSlice.actions;
export default userSlice.reducer;