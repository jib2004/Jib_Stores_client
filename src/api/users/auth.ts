import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SignUpInfo } from '../../types'



export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"https://jib-stores-backend.vercel.app/auth/",
        credentials:'include'// Add so your cookies and credentials can be stored
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        signUp: builder.mutation<SignUpInfo,Partial<SignUpInfo>>({
            query:(body)=>({
                url:'/register',
                method:'POST',
                body
            })
        }),
        googleAuth:builder.mutation<SignUpInfo,Partial<SignUpInfo>>({
            query:(body)=>({
                url:'/google-auth',
                method:"Post",
                body
            })
        }),
        login:builder.mutation<SignUpInfo,Partial<SignUpInfo>>({
            query:(body)=>({
                url:'/login',
                method:'POST',
                body
            })
        }),
        sendOTP:builder.mutation<SignUpInfo,Partial<SignUpInfo>>({
            query:(body)=>({
                url:'/send-otp',
                method:'POST',
                body
            })
        }),
        verifyOTPPassword:builder.mutation<SignUpInfo,Partial<SignUpInfo>>({
            query:(body)=>({
                url:'/verify-otp-password',
                method:'PUT',
                body
            })
        }),
        verifyOTPEmail:builder.mutation<SignUpInfo,Partial<SignUpInfo>>({
            query:(body)=>({
                url:'/verify-otp-email',
                method:'POST',
                body
            })
        }),
        changePassword:builder.mutation<SignUpInfo,Partial<SignUpInfo>>({
            query:(body)=>({
                url:'/forgot-password',
                method:"PUT",
                body
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:'/logout',
                method:'POST',

            })
        }),
        userDetailsUpdate:builder.mutation<SignUpInfo,Partial<SignUpInfo>>({
            query:({id,body})=>({
                url:`/user/${id}`,
                method:"PUT",
                body
        })
    }),
    userCreatePlan:builder.mutation({
        query:(body)=>({
            url:`/create-plan`,
            method:"POST",
            body
        })
    }),
    userVerificationPayment : builder.mutation({
        query:(body)=>({
            url:'/payment-verification',
            method:"POST",
            body
        })
    }),
    })
})

export const {useSignUpMutation,useGoogleAuthMutation,useLoginMutation,useSendOTPMutation,useVerifyOTPPasswordMutation,useVerifyOTPEmailMutation,useChangePasswordMutation,useLogoutMutation,useUserDetailsUpdateMutation,useUserCreatePlanMutation,useUserVerificationPaymentMutation} = userAuthApi