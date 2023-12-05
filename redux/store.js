import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { createWrapper } from "next-redux-wrapper";
export const store =()=> configureStore({
    reducer:{
        cart:cartReducer
    }
});


export const wrapper = createWrapper(store);