import { createSlice } from '@reduxjs/toolkit';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    getAdditionalUserInfo,
  } from "firebase/auth";
  import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const localUserData = localStorage.getItem("user")? 
JSON.parse(localStorage.getItem("user"))
:null;

const initialState = {
    localData:localUserData,
    username:localUserData? localUserData.user:null,
    email:localUserData? localUserData.email:null,
    isLoggedin:localUserData? localUserData.isLoggedin:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        // login
        ADD_USER(state,action){
            const newUser = {...action.payload};
            console.log("slice new user",newUser);

            if(state.email === newUser.email){
                console.log("loggedin user",state.username);
                return;
            }

            state.username = newUser.name;
            state.email = newUser.email;
            state.isLoggedin = true;
            console.log("slice user added",state.email,state.username,state.isLoggedin);
            // local storage
            localStorage.setItem("user",JSON.stringify({user:state.username,email:state.email,isLoggedin:state.isLoggedin}));

        },
        // logout
        LOGOUT(state){
            // firebase
            
            // REDUX
            localStorage.removeItem("user");
            localUserData.length=0;
            console.log("local",localUserData);
            console.log("user logged out",state.isLoggedin);
        }
        
    }
})

export const {ADD_USER,LOGOUT} =userSlice.actions;
export default userSlice.reducer;