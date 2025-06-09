import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({

    name:'cart',
    initialState:[],
    reducers:{
        addCart:(state,action)=>{
            state.push(action.payload)
        },
        clearCart:()=>{
            return[]
        }
    }
})



export const{addCart,clearCart}=cartSlice.actions
export default cartSlice.reducer



