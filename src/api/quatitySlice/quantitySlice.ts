import { createSlice } from "@reduxjs/toolkit";


const initialState:{
    id:string,
    productName:string
    price:number,
    quantity:number
    basePrice:number
    sellerId:string
    email:string,
    productImg:string
}[] = []

export const quantySlice = createSlice({
    name:'quantity',
    initialState,
    reducers:{
        setProduct: (state,action)=>{
            const existingProduct = state.find(item => item.id === action.payload.id);
            if (!existingProduct) {
                state.push(action.payload);
            }
           
        },        
         setQuantity: (state, action) => {
            const product = state.find(item => item.id === action.payload.id);
            if (product && action.payload.quantity >= 1 && action.payload.quantity <= 5) {
                product.quantity = action.payload.quantity; // Update quantity for the specific product
                product.price = action.payload.quantity * product?.basePrice
            }
        },
        resetQuantity: () => initialState
    }
})


export const {setProduct,setQuantity,resetQuantity} = quantySlice.actions;
export default quantySlice.reducer;
