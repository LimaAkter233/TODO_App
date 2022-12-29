import { createSlice } from "@reduxjs/toolkit"

const initialState = {
        todos:[]
}



const todoSlice = createSlice({
        name:'todo',
        initialState,
        reducers:{

        },
        extraReducers:(builder)=>{

        }
}) 

export default todoSlice.reducer