import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bidApi = createApi({
    reducerPath:'bidApi',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NODE_ENV === 'development'? 'http://localhost:5000/user/v1/bids' :"https://jib-stores-backend.vercel.app/user/v1/bids/",
        credentials:'include'
    }),
    tagTypes:["Bids"],
    endpoints:(builder)=>({
        getBidProducts: builder.query({
            query: ()=> '/get-all-products'
        }),
    })

})

export const {
    useGetBidProductsQuery
} = bidApi