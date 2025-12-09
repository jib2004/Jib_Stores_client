import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { productDetails } from '../../types'

export const buyerApi = createApi({
    reducerPath:'buyerApi',
     baseQuery: fetchBaseQuery({
            baseUrl:process.env.NODE_ENV === 'development'? 'http://localhost:5000/buyer' :"https://jib-stores-backend.vercel.app/buyer/",
            credentials:'include'
        }),
        tagTypes:['Buyer'],
        endpoints:(builder)=>({
            getAllProduct:builder.query({
                query: () =>'/product'
            }),
            getProductById:builder.query({
                query:({id,userId}) => `/product/${id}/${userId}`
            }),
            addToWishList:builder.mutation({
                query:({id,body})=>({
                    url:`/wishlist/${id}`,
                    method:"PUT",
                    body
                })
            }),
            getUserWislist:builder.query({
                query:(id) => `/wishlist/${id}`
            }),
            useAddToCartMutation:builder.mutation({
                query:({id,body})=>({
                    url:`/cart/${id}`,
                    method:"PUT",
                    body
                })
            }),
            getCartById:builder.query({
                query:(id) => `/cart/${id}`
            }),
            createOrder:builder.mutation({
                query:({id,body})=>({
                    url:`/create-order/${id}`,
                    method:"POST",
                    body
                })
            }),
            getUserOrders:builder.query({
                query:(id)=> `/order/${id}`
            }),
            getSearchResults:builder.query({
                query:(query) => `/search/${query}`
            })
        })
})


export const {
    useGetAllProductQuery,
    useGetProductByIdQuery,
    useAddToWishListMutation,
    useGetUserWislistQuery,
    useUseAddToCartMutationMutation,
    useGetCartByIdQuery,
    useCreateOrderMutation,
    useGetUserOrdersQuery,
    useGetSearchResultsQuery
} = buyerApi