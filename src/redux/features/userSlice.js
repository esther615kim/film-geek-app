import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name:'',
    email:'',
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        // add user
        addUser(state,action){
            const newUser = {...action.payload};
            console.log("newUser", newUser);

        }
        // check user
    }
})

export const {addUser} =userSlice.actions;
export default userSlice.reducer;