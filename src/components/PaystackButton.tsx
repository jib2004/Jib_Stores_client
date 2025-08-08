import React from 'react'
import { usePaystackPayment } from 'react-paystack';
import {motion} from 'motion/react'
import { useCreateOrderMutation } from '../api/users/buyer';
import { toast } from 'sonner';
import { useAppSelector,useAppDispatch } from '../hooks/hooks';
import { useNavigate } from 'react-router';
import { resetQuantity } from '../api/quatitySlice/quantitySlice';
import { clearCart } from '../api/userSlice/userSlice';

type paystackProp ={
    id:string
    email:string
    amount:number
    address?:string
}

const PaystackButton = ({id,email,amount,address}:paystackProp) => {
    const productDetails = useAppSelector((state)=> state.quantity) 
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [createOrder] = useCreateOrderMutation()
      const config = {
      reference: (new Date()).getTime().toString(),
      email: email,
      amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey: import.meta.env.VITE_PAYSTACK_SECRET_KEY ,
      currency:'NGN'
  };

  // const handleOrderTest = async() =>{
  //    const res = await createOrder({id,body:{productDetails}}).unwrap()
  // }

    // you can call this function anything
  const onSuccess = async(reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    try {
        if(reference.message === 'Approved' && reference.status === "success"){
            await createOrder({id,body:{productDetails,reference}}).unwrap()
            navigate(`/user/order/${id}`)
            dispatch(resetQuantity())
            dispatch(clearCart())
        }else{
            toast.error(reference.message)
        }
    } catch (error) {
        toast.error('Failed')
        console.log(error)
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log('closed')
  }

  const initializePayment = usePaystackPayment(config);
  return (
    <div className='flex justify-end'>
              <motion.button 
              whileHover={{
                backgroundColor:'#343434',
                transition:{
                  ease:'easeIn',
                  duration:0.5
                }
              
              }} 
              whileTap={{
                backgroundColor:'#000'
              }}
              className='bg-[#000] text-white w-[150px]'
              onClick={()=>{
                // handleOrderTest()
                if(!address){
                  toast.error('Please add an address')
                  return
                }
                initializePayment({onSuccess, onClose})
              }}
              >Pay</motion.button>
              
        </div>
  )
}

export default PaystackButton
