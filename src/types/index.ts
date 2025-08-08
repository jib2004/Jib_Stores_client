import React from "react"

export interface appProps{
    children:React.ReactNode
}

export interface SignUpInfo{
    id:string | null
    body:userDetails | null
    name?:string
    email:string | null;
    password:string
    message:string
    otp?:string|null,
    data:userDetails
    
}

export interface productDetails{
    _id:string |null
    title:string | null;
    price:number | null;
    description:string | null;
    image:string[] | null;
    category:string | null;
    rating?:{
        rate:number[],
        count:number
    }
    stock:number | null;
    reviews?:[],
    seller:string | null
    isInspected:boolean,
    isDisCount:boolean,
    discountedPrice:number,
    amountSold:number,
    isSold:boolean,
    keywords:string[]

}


export interface ProductInputs extends productDetails {
    sellerName?: string;
    fileLink?: string[];
    uploadedImage?: string[];
}



export interface userDetails{
    _id?:string |null
    name?:string | null;
    email?:string | null;
    phoneNumber?:string | null
    address?:string |undefined
    role?: "user" | "admin" 
    isVerified?:boolean | null
    isBlocked?:boolean | null
    profilePicture?:string | null
    searchHistory?:string[] | null
    cart?:string[] 
    wishlist?:string[] 
    orders?:productDetails[] | null
    isSeller?:boolean
    isCACLegit?:boolean
    plan?:'free' | 'basic' | 'standard' | "",
    sales?:productDetails[] | null
    wallet?:{
        balance:number,
        currency:string,
        lastTransaction:string,
        lastTransactionDate: string,
        lastTransactionAmount: number
    }
    message?:string
    subscription?:{
        reference:string,
        amount:number,
        status:'pending' | 'successful' | 'failed',
        authorization_url:string
    }
}


