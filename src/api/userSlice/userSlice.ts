import { createSlice } from "@reduxjs/toolkit";
import { userDetails } from "../../types";

const initialState:userDetails={
    _id:'',
    name:'',
    email:'',
    phoneNumber:'',
    address:'',
    profilePicture:"",
    role:"user",
    isVerified:false,
    isBlocked:false,
    searchHistory:[],
    cart:[],
    wishlist:[] ,
    orders:[],
    message:''
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        getUserDetails:(state,action)=>{
           return state = action.payload;
        },
        setEmailForPasswordChange:(state,action)=>{
           return  state.email=action.payload;
        },
         // Alternatively, you can add reducer to add single item:
        addToWishlist(state, action) {
            state.wishlist.push(action.payload);
        },
        // And remove item by id or value if needed:
        removeFromWishlist(state, action) {
            state.wishlist = state.wishlist.filter(item => item !== action.payload);
        },
        addedProductToCart(state, action) {
            state.cart.push(action.payload);   
        },
        removeFromCart(state, action) {
            state.cart = state.cart.filter(item => item !== action.payload);
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
        }
        
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
    clearCart
} = userSlice.actions
export default userSlice.reducer