import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name:'',
    email:'',
    password:''
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        // fetch user
        // update 
        // delete 
    }
})

export default userSlice.reducer;