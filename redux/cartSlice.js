import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:"cart",
    initialState:[],
    items:[],
    reducers:{
        add:(state,payload)=>{
            state.push(payload);
        },
        remove:(state)=>{
            return [];
        },
        update:(state,payload)=>{
            return payload.payload;
        }

    }
})


export const {remove,add,update} = cartSlice.actions;
export default cartSlice.reducer;   