import { createSlice } from "@reduxjs/toolkit";
import { userDetails } from "../../types";

const initialState:userDetails={
    _id:null,
    name:null,
    email:null,
    phoneNumber:null,
    address:undefined,
    profilePicture:null,
    role:"user",
    isVerified:null,
    isBlocked:null,
    searchHistory:[],
    cart:[],
    wishlist:[],
    orders:[],
    isSeller:false,
    isCACLegit:false,
    plan:"",
    sales:[],
    wallet:{
        balance:0,
        currency:"NGN",
        lastTransaction:"",
        lastTransactionDate:"",
        lastTransactionAmount:0
    },
    message:''
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        getUserDetails:(state,action)=>{
           return action.payload;
        },
        setEmailForPasswordChange:(state,action)=>{
           state.email=action.payload;
        },
         // Alternatively, you can add reducer to add single item:
        addToWishlist(state, action) {
            if (state.wishlist) {
                state.wishlist.push(action.payload);
            }
        },
        // And remove item by id or value if needed:
        removeFromWishlist(state, action) {
            if (state.wishlist) {
                state.wishlist = state.wishlist.filter(item => item !== action.payload);
            }
        },
        addedProductToCart(state, action) {
            if (state.cart) {
                state.cart.push(action.payload);
            }
        },
        removeFromCart(state, action) {
            if (state.cart) {
                state.cart = state.cart.filter(item => item !== action.payload);
            }
        },
        setUserAddress:(state,action)=>{
            state.address = action.payload.address
        },
        logout:()=>{
            return initialState;
        },
        clearCart:(state)=>{
            return {
                ...state,
                cart:[]
            }
        },
        
    }
    
})

export const {
    getUserDetails,
    setEmailForPasswordChange,
    logout,
    addToWishlist,
    removeFromWishlist,
    addedProductToCart,
    removeFromCart,
    setUserAddress,
    clearCart,
    
} = userSlice.actions
export default userSlice.reducer